<?php

declare(strict_types=1);

namespace Smic\Components\Service;

use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\PathUtility;

class ManifestService
{
    private const string DEFAULT_FRONTEND_BASE_PATH = 'build';

    private array $registry = [];

    public function __construct(
        private readonly PageRenderer $pageRenderer,
    ) {}

    public function addFromManifest(string $name): void
    {
        if (in_array($name, $this->registry, true)) {
            return;
        }

        $manifestFilePath = GeneralUtility::getFileAbsFileName($this->getFrontendBasePath() . '/.vite/manifest.json');
        if (!is_readable($manifestFilePath)) {
            return;
        }

        $manifest = json_decode(file_get_contents($manifestFilePath), true);
        if (!isset($manifest[$name])) {
            return;
        }

        $file = $this->getFrontendBasePath() . '/' . $manifest[$name]['file'];
        if (PathUtility::isAbsolutePath($file)) {
            $file = PathUtility::getAbsoluteWebPath($file);
        }

        $this->registry[] = $name;
        $this->pageRenderer->addJsFile($file, 'module');
        $this->loadCss($manifest, $name);
        $this->loadImports($manifest, $name);
    }

    private function loadCss($manifest, string $name): void
    {
        if (!isset($manifest[$name]['css'])) {
            return;
        }

        foreach ($manifest[$name]['css'] as $css) {
            $file = $this->getFrontendBasePath() . '/' . $css;
            if (PathUtility::isAbsolutePath($file)) {
                $file = PathUtility::getAbsoluteWebPath($file);
            }
            $this->pageRenderer->addCssFile($file);
        }
    }

    private function loadImports(array $manifest, string $name): void
    {
        if (!isset($manifest[$name]['imports'])) {
            return;
        }

        foreach ($manifest[$name]['imports'] as $import) {
            $importManifestItem = $manifest[$import];
            if (($importManifestItem['isEntry'] ?? false) === true) {
                continue;
            }

            $this->addFromManifest($import);
        }
    }

    private function getFrontendBasePath(): string
    {
        if (empty($_ENV['ASSETS_FRONTEND_BASE_PATH'])) {
            return Environment::getPublicPath() . '/' . self::DEFAULT_FRONTEND_BASE_PATH;
        }
        return Environment::getPublicPath() . '/' . $_ENV['ASSETS_FRONTEND_BASE_PATH'];
    }
}