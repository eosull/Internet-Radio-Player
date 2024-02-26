from django.shortcuts import render
from .forms import SearchForm

from pyradios import RadioBrowser

def index(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            rb = RadioBrowser()
            search_term = form.cleaned_data['search_term']
            search_result = rb.search(name=search_term, hidebroken=True)

            if not search_result:
                return render(request, 'index.html', {'form': form})
            else:
                context = {
                    'form': form,
                    'search_result': search_result,
                }
                return render(request, 'index.html', context)

    else:
        form = SearchForm()
        return render(request, 'index.html', {'form': form})

    return render(request, 'index.html')