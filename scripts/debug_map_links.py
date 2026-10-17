
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

ponds = {
    "Aldrich Lake": "https://www.mass.gov/info-details/aldrich-lake",
    "Althea Lake": "https://www.mass.gov/info-details/althea-lake"
}

session = requests.Session()
session.headers.update({
    "User-Agent": "OpenFish/0.1 (educational fisheries research)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9"
})

for name, page_url in ponds.items():
    print(f"\n--- {name} ---")

    response = session.get(page_url, timeout=30)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    for link in soup.find_all("a", href=True):
        label = link.get_text(" ", strip=True)
        href = urljoin(response.url, link["href"])

        if "directions" in label.lower() or "maps" in href.lower():
            print("TEXT:", label)
            print("URL:", href)
            print()
