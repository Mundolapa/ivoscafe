# Dockerfile

# Pull base image
FROM python:3.11

# Create a group and user
RUN groupadd -r django && useradd -r -g django django

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /code

# Install dependencies
COPY requirements.txt /code/
RUN pip install --upgrade pip
RUN apt-get update && apt-get install -y gcc python3-dev libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install GDAL dependencies
RUN apt-get update && apt-get install -y gdal-bin libgdal-dev && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set GDAL environment variables
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Install Python dependencies, including GDAL
RUN pip install -r requirements.txt

# Copy project
COPY . /code/

# Change ownership
RUN chown -R django:django /code

# Change to the new user
USER django

# Collect static files
 RUN python manage.py collectstatic --noinput

# Expose the port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
