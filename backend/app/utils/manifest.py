# backend/app/utils/manifest.py

import os
import json
from pathlib import Path
from typing import Optional, Dict
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

# initialize manifest cache (used only in production environments)
_manifest_cache: Optional[Dict] = None

def load_manifest(static_dir: Path = Path(__file__).resolve().parent.parent / "static/build/.vite", force_reload: bool = False) -> Dict:
    global _manifest_cache

    # Read ENV each time (instead of hard-coding it at module scope)
    ENV_MODE = os.getenv("ENV", "production")

    # Always reload if in development mode
    if _manifest_cache is None or force_reload or ENV_MODE == "development":
        manifest_path = static_dir / "manifest.json"
        if not manifest_path.exists():
            raise FileNotFoundError(f"Manifest file not found: {manifest_path}")
        with manifest_path.open("r", encoding="utf-8") as f:
            _manifest_cache = json.load(f)

    return _manifest_cache

def parse_manifest_entry(entry_name: str) -> Dict[str, Optional[str]]:
    manifest = load_manifest()
    entry = manifest.get(entry_name)
    if not entry:
        raise ValueError(f"No entry named '{entry_name}' found in manifest.")
    return {
        "js": entry.get("file"),
        "css": entry.get("css", [None])[0]
    }
