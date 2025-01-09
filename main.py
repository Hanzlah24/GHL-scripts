import requests

def save_script(url, file_path):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
        
        # Save the content to a local file
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(response.text)
        
        print(f"Script saved successfully to {file_path}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download the script: {e}")

# URL of the script and the local file path
script_url = "https://scripts.jdfunnel.com/script.php?id=webworker_init404formula"
local_file_path = "webworker_init404formula.js"

# Save the script
save_script(script_url, local_file_path)
