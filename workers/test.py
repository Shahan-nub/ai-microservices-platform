import requests
from bs4 import BeautifulSoup

def print_unicode_grid_from_google_doc(url = "https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub"):
    response = requests.get(url, timeout=30)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    points = []
    max_x = 0
    max_y = 0

    for table in soup.find_all("table"):
        rows = table.find_all("tr")

        for row in rows[1:]:
            cells = row.find_all(["td", "th"])

            if len(cells) < 3:
                continue

            try:
                x = int(cells[0].get_text(strip=True))
                char = cells[1].get_text(strip=True)
                y = int(cells[2].get_text(strip=True))

                if not char:
                    continue

                points.append((x, y, char))
                max_x = max(max_x, x)
                max_y = max(max_y, y)

            except ValueError:
                continue

    if not points:
        raise ValueError("No valid character coordinates found.")

    grid = [
        [" "] * (max_x + 1)
        for _ in range(max_y + 1)
    ]

    for x, y, char in points:
        grid[y][x] = char

    for y in range(max_y, -1, -1):
        print("".join(grid[y]))