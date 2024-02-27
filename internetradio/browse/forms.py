from django import forms
from django.forms import TextInput

class SearchForm(forms.Form):

    search_term = forms.CharField(widget=forms.TextInput(
                                  attrs={
                                    'placeholder': 'Station Name',
                                    'style': 'width: 250px;',
                                    'class': 'form-control text-center'
                                    }),
                                    label=''
                                    )