from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Define a folder to store the uploaded files
BASE_UPLOAD_FOLDER = 'uploads'
if not os.path.exists(BASE_UPLOAD_FOLDER):
    os.makedirs(BASE_UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files['file']
    title = request.form.get('title')
    subject = request.form.get('subject')

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Create a subject-specific folder if it doesn't exist
    subject_folder = os.path.join(BASE_UPLOAD_FOLDER, subject)
    if not os.path.exists(subject_folder):
        os.makedirs(subject_folder)

    # Save the file to the subject-specific folder
    file_path = os.path.join(subject_folder, file.filename)
    file.save(file_path)

    return jsonify({
        "message": "File uploaded successfully",
        "file_name": file.filename,
        "title": title,
        "subject": subject,
        "file_path": file_path
    }), 200

@app.route('/api/data', methods=['GET'])
def get_files():
    # List all files in the uploads directory, organized by subject
    subjects = {}
    
    # Iterate over each subject folder
    for subject in os.listdir(BASE_UPLOAD_FOLDER):
        subject_path = os.path.join(BASE_UPLOAD_FOLDER, subject)
        if os.path.isdir(subject_path):
            files = os.listdir(subject_path)
            file_urls = [f"http://localhost:5000/uploads/{subject}/{file}" for file in files]
            subjects[subject] = file_urls

    return jsonify({
        "message": "Files retrieved successfully",
        "files": subjects
    })

@app.route('/uploads/<subject>/<filename>')
def uploaded_file(subject, filename):
    return send_from_directory(os.path.join(BASE_UPLOAD_FOLDER, subject), filename)

if __name__ == '__main__':
    app.run(debug=True)
