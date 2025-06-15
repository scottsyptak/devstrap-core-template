# backend/app/utils/middleware.py

import os
from fastapi import FastAPI
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware

from app.utils.logging import LoggingMiddleware

def get_list_env(var_name: str, default: list[str]) -> list[str]:
    """
    Parse a comma-separated list from an environment variable.
    """
    raw = os.getenv(var_name)
    if raw:
        return [v.strip() for v in raw.split(",") if v.strip()]
    return default

def configure_middleware(app: FastAPI, env_mode: str) -> None:
    """
    Apply middleware based on the current environment.
    """

    # Always-on middleware
    app.add_middleware(LoggingMiddleware)
    app.add_middleware(GZipMiddleware, minimum_size=500)

    # Load from envars or fallback to sensible defaults
    origins = get_list_env("CORS_ORIGINS", ["http://localhost:5173"])
    allowed_hosts = get_list_env("TRUSTED_HOSTS", ["*.fly.dev"])

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    )

    # Production-only
    if env_mode == "production":
        app.add_middleware(HTTPSRedirectMiddleware)
        app.add_middleware(
            TrustedHostMiddleware,
            allowed_hosts=allowed_hosts
        )