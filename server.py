from flask import Flask, render_template, request
import os, random

app = Flask(__name__)

# Path to funny animal images
ANIMAL_FOLDER = os.path.join('static', 'animals')

# List of funny captions
funny_templates = [
    "You are 98% sleepy {animal}.",
    "Certified drama {animal}.",
    "The resemblance to a {animal} is uncanny.",
    "Half human, half {animal}, 100% fabulous.",
    "A true wild {animal} in the urban jungle.",
    "Warning: May randomly turn into a {animal} at any moment.",
    "Living your best {animal} life.",
    "Professional snack thief {animal}.",
    "Rare species: Laughing {animal}.",
    "When life gives you lemons, be a sassy {animal}.",
    "Not all heroes wear capes, some are {animal}s.",
    "Local legend: The great dancing {animal}.",
    "Certified cuteness overload {animal}.",
    "Probably plotting world domination… as a {animal}.",
    "You give strong ‘I skipped work to nap’ {animal} vibes.",
    "Mystery solved: You’re secretly a {animal} undercover.",
    "Too glam to give a damn, said the {animal}.",
    "Elite level mischief-maker {animal}.",
    "National treasure: Rare majestic {animal} sighting."
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files['photo']  # Ignored, as per your 'useless' site idea
    animals = os.listdir(ANIMAL_FOLDER)
    chosen_animal = random.choice(animals)
    caption_template = random.choice(funny_templates)
    caption = caption_template.format(animal=os.path.splitext(chosen_animal)[0])
    return {"animal": f"/static/animals/{chosen_animal}", "caption": caption}

if __name__ == "__main__":
    app.run(debug=True)
