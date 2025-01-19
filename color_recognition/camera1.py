from flask import Flask, request, jsonify
import os
import base64
from color_classification_image1 import predict_color
from colour_recom import ColorRecommender

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the uploads directory exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_image():
    recommender = ColorRecommender()
    data = request.get_json()

    # Check if the image is in the request
    if 'image' not in data:
        return jsonify({"error": "No image found in the request"}), 400

    # Decode the base64 image
    image_data = data['image']
    try:
        # Convert base64 string to bytes
        image_bytes = base64.b64decode(image_data)
        # Save the image to the upload folder
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'uploaded_image.png')
        with open(image_path, 'wb') as f:
            f.write(image_bytes)

        # Predict color immediately after saving
        prediction = predict_color(image_path)
        print('Detected color:', prediction)

        recommendations_masc = recommender.get_recommendations('#0000FF', gender='masculine')
        print("\nMasculine recommendations:")
        print(recommendations_masc)
        
        # Or use color names with feminine preference
        recommendations_fem = recommender.get_recommendations('blue', gender='feminine')
        print("\nFeminine recommendations:")
        print(recommendations_fem)

        return jsonify({"message": "Image uploaded and color detected", "color": prediction},recommendations_masc,recommendations_fem), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
