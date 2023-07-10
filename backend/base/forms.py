from django import forms
from leaflet.admin import LeafletWidget
from .models import GlobalSettings

class GlobalSettingsForm(forms.ModelForm):
    class Meta:
        model = GlobalSettings
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        return cleaned_data

