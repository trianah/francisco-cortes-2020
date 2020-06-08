<?php
/**
 * Custom Helpers module for Craft CMS 3.x
 *
 * afaef
 *
 * @link      https://ournameismud.co.uk
 * @copyright Copyright (c) 2018 Richard George
 */

namespace modules\mudmodule\twigextensions;

use modules\mudmodule\MudModule;
use aelvan\imager\Imager as Imager;
use aelvan\imager\services\ImagerService;
use spicyweb\embeddedassets\Plugin as EmbeddedAssets;
use typedlinkfield\Plugin as TypedLinkField;

use Craft;
use Twig_Extension;
use craft\helpers\UrlHelper;

/**
 * Twig can be extended in many ways; you can add extra tags, filters, tests, operators,
 * global variables, and functions. You can even extend the parser itself with
 * node visitors.
 *
 * http://twig.sensiolabs.org/doc/advanced.html
 *
 * @author    Richard George
 * @package   MudModule
 * @since     1.0.0
 */
class MudModuleTwigExtension extends \Twig_Extension
{
	// Public Methods
	// =========================================================================

	/**
	 * Returns the name of the extension.
	 *
	 * @return string The extension name
	 */
	public function getName()
	{
			return 'MudModule';
	}

	/**
	 * Returns an array of Twig filters, used in Twig templates via:
	 *
	 *      {{ 'something' | someFilter }}
	 *
	 * @return array
	 */
	public function getFilters()
	{
			return [
					new \Twig_SimpleFilter('someFilter', [$this, 'someInternalFunction']),
			];
	}

	/**
	 * Returns an array of Twig functions, used in Twig templates via:
	 *
	 *      {% set this = someFunction('something') %}
	 *
	* @return array
		*/
	public function getFunctions()
	{
		return [
			new \Twig_SimpleFunction('fetchData', [$this, 'fetchData']),
			new \Twig_SimpleFunction('getImage', [$this, 'getImage']),
			new \Twig_SimpleFunction('getVideo', [$this, 'getVideo']),
			new \Twig_SimpleFunction('getLink', [$this, 'getLink']),
			new \Twig_SimpleFunction('getVideoId', [$this, 'getVideoId'])
		];
	}

	/**
	 * Our function called via Twig; it can do anything you want
	 *
	 * @param null $text
	 *
	 * @return string
	 */
	public function fetchData($endpoint)
	{
			$data = file_get_contents($endpoint);
			return json_decode($data, true);
	}
	
	public function getImage($file, $transform = null, $transformDefaults = null, $color = 'transparent')
	{
		// Test file is passed in
		if (!$file) return null;

		// Convert to Asset if AssetQuery
		$file = $file->uid ? $file : $file[0];

		// Imager not enabled, transform is not passed in or file is SVG, don't transform and return
		if (!Imager::$plugin || !$transform || $file->extension == 'svg') return array (
			'alt' => $file->title,
			'src' => $file->url,
			'url' => $file->url,
			'webp' => null,
			'srcset' => null,
			'width' => $file->width,
			'height' => $file->height,
			'aspectRatio' => ($file->height / $file->width) * 100 . '%'
		);

		$serverSupportsWebp = Imager::$plugin->imager->hasSupportForWebP() ?? null;
		
		$image = Imager::$plugin->imager->transformImage($file, $transform, $transformDefaults);

		if($transformDefaults) {
			$transformDefaults['format'] = $serverSupportsWebp ? 'webp' : 'jpeg';
		} else {
			$transformDefaults = ['format' => $serverSupportsWebp ? 'webp' : 'jpeg'];
		}

		$webpImage = Imager::$plugin->imager->transformImage($file, $transform, $transformDefaults);

		return array(
			'id' => $file->id,
			'alt' => $file->title,
			'title' => $file->title,
			'src' => $image[0]->url,
			'webpSrc' => $webpImage[0]->url,
			'url' => $image[0]->url,
			'srcset' => Imager::$plugin->imager->srcset($image),
			'webpSrcset' => $serverSupportsWebp ? Imager::$plugin->imager->srcset($webpImage) : null,
			'width' => $image[0]->width,
			'height' => $image[0]->height,
			'aspectRatio' => ($image[0]->height / $image[0]->width) * 100 . '%',
			'placeholder' => 'data:image/svg+xml;charset=utf-8,'.rawurlencode("<svg xmlns='http://www.w3.org/2000/svg' width='$image[0]->width' height='$image[0]->height' style='background:$color'/>"),
			'webp' => $serverSupportsWebp
		);
	}

	public function getVideo($file, $params = []) {
		if (!$file)
		{
			return null;
		}

		$image = isset($params['image']) ? $params['image'] : null;
		$autoplay = isset($params['autoplay']) ? $params['autoplay'] : 1;
		$controls = isset($params['controls']) ? $params['controls'] : 0;
		$playsInline = isset($params['playsInline']) ? $params['playsInline'] : 1;
		$preload = isset($params['preload']) ? $params['preload'] : 1;
		$muted = isset($params['muted']) ? $params['muted'] : 0;
		$autopause = isset($params['autopause']) ? $params['autopause'] : 1;
		$loop = isset($params['loop']) ? $params['loop'] : 1;

		if($file->extension == 'mp4') {
			$video = array(
				'id' => $file->id,
				'type' => 'local',
				'url' => $file->getUrl(),
				'title' => $file->title,
				'poster' => $image ? $image->getUrl() : null,
				'code' => '<video src="' . $file->getUrl() . '"' . ($autoplay ? ' autoplay' : '') . ($controls ? ' controls' : '') . ($muted ? ' muted' : '') . ($loop ? ' loop' : '') . ($playsInline ? ' playsinline' : '') .'></video>',
				'settings' => [
					'autoplay' => $autoplay,
					'controls' => $controls, 
					'playsinline' => $playsInline, 
					'muted' => $muted,
					'preload' => $preload,
					'autopause=' . $autopause,
					'loop=' . $loop,
					'title=' . 0,
					'byline=' . 0,
					'portrait=' . 0
				]
			);
		} else {
			if (!EmbeddedAssets::$plugin)
			{
				return null;
			}
			
			$embeddedAsset = EmbeddedAssets::$plugin->methods->getEmbeddedAsset($file);

			$video = array(
				'id' => $file->id,
				'type' => $embeddedAsset['providerName'],
				'url' => $embeddedAsset->getVideoUrl([
					'autoplay=' . $autoplay, 
					'controls=' . $controls, 
					'playsinline=' . $playsInline, 
					'muted=' . $muted,
					'preload=' . $preload,
					'autopause=' . $autopause,
					'loop=' . $loop,
					'title=' . 0,
					'byline=' . 0,
					'portrait=' . 0,
					'color=' . '00A3FF'
				]),
				'title' => $embeddedAsset['title'],
				'code' => $embeddedAsset->getVideoCode([
					'autoplay=' . $autoplay, 
					'controls=' . $controls, 
					'playsinline=' . $playsInline, 
					'muted=' . $muted,
					'preload=' . $preload,
					'autopause=' . $autopause,
					'loop=' . $loop,
					'title=' . 0,
					'byline=' . 0,
					'portrait=' . 0,
					'color=' . '00A3FF'
				]),
				'poster' => $image ? $image->getUrl() : $embeddedAsset['image'],
				'aspectRatio' => $embeddedAsset['aspectRatio']
			);
		}

		return $video;
	}

	public function getVideoId($file, $autoplay = 1, $controls = 0, $playsInline = 1) {
		if (!EmbeddedAssets::$plugin || !$file)
		{
			return null;
		}

		$embeddedAsset = EmbeddedAssets::$plugin->methods->getEmbeddedAsset($file);
		$type = $embeddedAsset['providerName'];
		$url = $embeddedAsset['url'];

		if(preg_match("/(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/", $url, $output_array)) {
			$id = (int)$output_array[5];
		}

		if(preg_match("/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/", $url, $output_array)) {
			$id = (int)$output_array[1];
		}

		return $id;
	}

	public function getLink($link)
	{
		if (!$link) return null;
		if (!TypedLinkField::getInstance() || !$link) return null;
	
		return array(
			'url' => $link->value,
			'text' => $link->customText,
			'target' => $link->target
		);
	}
}
