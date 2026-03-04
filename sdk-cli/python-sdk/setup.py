from setuptools import setup, find_packages

setup(
    name="mindflare-sdk",
    version="0.1.1",
    packages=find_packages(),
    install_requires=["requests"],
    description="The official Python SDK for Mindflare AI.",
    author="Mindflare AI",
)
