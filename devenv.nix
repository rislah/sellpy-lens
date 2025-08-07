{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:
{
  packages = [
    pkgs.nodePackages.typescript-language-server
  ];

  languages.javascript = {
    enable = true;
    npm.enable = true;
    npm.install.enable = true;
  };
  git-hooks.hooks.prettier.enable = true;
}
