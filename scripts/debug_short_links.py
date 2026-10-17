
import requests

links = {
    "Aldrich Lake": "https://maps.app.goo.gl/hPVg4TTeMVvvjU39A",
    "Althea Lake": "https://maps.app.goo.gl/FMNRXt98Xv1sj6dEA",
}

for name, short_url in links.items():
    try:
        response = requests.get(
            short_url,
            allow_redirects=True,
            timeout=20,
            headers={"User-Agent": "OpenFish/0.1"}
        )

        print(f"\n{name}")
        print("Status:", response.status_code)
        print("Expanded URL:", response.url)

    except requests.RequestException as error:
        print(f"FAILED {name}: {error}")
