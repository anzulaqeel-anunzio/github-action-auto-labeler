# Auto Labeler Action

Save time and keep your Pull Requests organized by automatically applying labels based on the modified files. This GitHub Action checks the paths of changed files and adds the corresponding labels.

## Features

-   **Path-Based Labeling**: Configure rules to map folders to labels (e.g., `src/ui` -> `frontend`).
-   **Multi-Label Support**: Can apply multiple labels if changes span different areas.
-   **Configurable**: Uses a simple YAML or JSON configuration file.
-   **Wait-Free**: Runs efficiently at the start of a PR.

## Usage

Create a workflow file (e.g., `.github/workflows/labeler.yml`):

```yaml
name: Labeler
on: [pull_request]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Auto Labeler
        uses: ./
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          config: '.github/labeler-config.json'
```

### Example Config (`.github/labeler-config.json`)

```json
{
  "frontend": ["src/client/**", "pages/**"],
  "backend": ["src/server/**", "api/**"],
  "documentation": ["README.md", "docs/**"]
}
```

## Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `token` | GITHUB_TOKEN | `${{ github.token }}` |
| `config` | Path to config file | `.github/label-config.json` |

## Contact

Developed for Anunzio International by Anzul Aqeel.
Contact +971545822608 or +971585515742.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
### 🔗 Part of the "Ultimate Utility Toolkit"
This tool is part of the **[Anunzio International Utility Toolkit](https://github.com/anzulaqeel-anunzio/ultimate-utility-toolkit)**.
Check out the full collection of **180+ developer tools, scripts, and templates** in the master repository.

Developed for Anunzio International by Anzul Aqeel.
