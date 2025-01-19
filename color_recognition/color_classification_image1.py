import cv2
from color_recognition_api import color_histogram_feature_extraction
from color_recognition_api import knn_classifier
import os

# Define the upload folder
UPLOAD_FOLDER = 'uploads'

def get_latest_image(upload_folder):
    """
    Get the most recent image from the upload folder.
    """
    try:
        files = os.listdir(upload_folder)
        images = [file for file in files if file.endswith(('jpg', 'jpeg', 'png'))]
        images.sort(key=lambda x: os.path.getmtime(os.path.join(upload_folder, x)), reverse=True)
        if images:
            return os.path.join(upload_folder, images[0])
        else:
            print("No images found in the upload folder.")
            return None
    except Exception as e:
        print(f"Error accessing upload folder: {e}")
        return None

def predict_color(image_path):
    """
    Predict the color of the image at the given path.
    """
    if not image_path:
        print("No image path provided.")
        return None

    source_image = cv2.imread(image_path)
    prediction = 'n.a.'

    # Check if training data is available
    PATH = './training.data'
    if not os.path.isfile(PATH) or not os.access(PATH, os.R_OK):
        print('Training data is being created...')
        open('training.data', 'w').close()
        color_histogram_feature_extraction.training()
        print('Training data is ready, classifier is loading...')

    # Get the prediction
    color_histogram_feature_extraction.color_histogram_of_test_image(source_image)
    prediction = knn_classifier.main('training.data', 'test.data')
    print('Detected color is:', prediction)

    return prediction
