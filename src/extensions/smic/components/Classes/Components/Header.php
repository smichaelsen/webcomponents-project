<?php

declare(strict_types=1);

namespace Smic\Components\Components;

use Sinso\Webcomponents\DataProviding\ComponentInterface;
use Sinso\Webcomponents\DataProviding\Traits\ContentObjectRendererTrait;
use Sinso\Webcomponents\Dto\ComponentRenderingData;
use Sinso\Webcomponents\Dto\InputData;
use Smic\Components\Service\ManifestService;

class Header implements ComponentInterface
{
    use ContentObjectRendererTrait;

    public function __construct(
        private readonly ManifestService $manifestService,
    ) {}

    public function provide(InputData $inputData): ComponentRenderingData
    {
//        $this->manifestService->addFromManifest('src/entrypoints/main.js');

        $componentRenderingData = new ComponentRenderingData();
        $componentRenderingData->setTagName('my-header');
        $componentRenderingData->setTagProperties([
            'title' => $inputData->record['header'],
            'subtitle' => $inputData->record['subheader'],
        ]);
        return $componentRenderingData;
    }
}