from django.shortcuts import render
from django.core.paginator import Paginator

from .forms import SearchForm

from pyradios import RadioBrowser

import random

def index(request):

    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            searched = True
            rb = RadioBrowser()
            search_term = form.cleaned_data['search_term']
            search_return = rb.search(name=search_term, tag=search_term,
                                      order="votes", country=search_term,
                                      hidebroken=True, name_exact=False)
            request.session['search_return'] = search_return
            paginator = Paginator(search_return, 12)

            page_number = request.GET.get("page")
            results = paginator.get_page(page_number)         

            if not results:
                context = {
                    'form': form,
                    'searched': searched
                }
                return render(request, 'index.html', context)
            else:
                context = {
                    'form': form,
                    'results': results,
                    'searched': searched
                }
                return render(request, 'index.html', context)

    if request.method == 'GET':

        context = {}

        if 'country' in request.GET:
            country = request.GET['country']
            paginator = Paginator(country_sort(country), 12)

            if 'page' in request.GET:
                page_number = request.GET.get('page')
                results = paginator.get_page(page_number)
                context.update({'results': results})
            else:
                results = paginator.get_page(1)
                context.update({'results': results})
        
            sorted = True
            context.update({'sorted': sorted})

        else:
            if 'page' in request.GET:
                paginator = Paginator(request.session['search_return'], 12)
                page_number = request.GET.get('page')
                results = paginator.get_page(page_number)
                context.update({'results': results})
                sorted = False
                searched = True
                context.update({'searched': searched})

        form = SearchForm()
        context.update({'form': form, 'countries': get_countries()})
        return render(request, 'index.html', context)
        print(request.session['search_return'])
    

def country_sort(term):
    rb = RadioBrowser()
    search_return = rb.search(countrycode=term, order="votes", hidebroken=True)
    return search_return

def get_countries():
    rb = RadioBrowser()
    all_countries = rb.countries()
    random_countries = []
    while len(random_countries) <= 5:
        selection = random.randint(0, len(all_countries))
        random_countries.append({
            'name': all_countries[selection]['name'],
            'country_code': all_countries[selection]['iso_3166_1']
        })
    return random_countries