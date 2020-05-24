# The Early Ruskin Manuscripts, 1826–1842
https://erm.selu.edu

## About
The Early Ruskin Manuscripts, 1826–1842 is a project of Southeastern Louisiana University and Humanities Online, both under the direction of the university's Department of English.

All commentary in ERM, including apparatuses, glosses, notes transcripts, and other editorial treatments of the manuscripts is © by David C. Hanson.

Files in this repository are licensed using the MIT license. (See [License](./LICENSE)).

### Staff and Support
https://erm.selu.edu/webpages/staff

### Legal
https://erm.selu.edu/webpages/legal




#Developer Note:

##File Structure
    
    src
    ├---app/components
    |   |---HeadNavigation
    |   |   |---HeadNavigation.js       #This is where top nav menu is located
    |   |---App
    |   |   |---App.js                  # is where you setup new route to catch
    |   |---News
    |   |---Footer
    |   |---NestingComponents
    |   |   |---Card
    |   |   |   |---NewsProfile         #Renders news in big card
    |   |   |   |---NewsThubnail        #Renders mews in small card for grid view
    |   |   |---PostNews
    |   |   |   |---PostNews            #Renders form where admin can change form
    ├──-config
    |   |---constants.js                #Renders dev vs production data 
    ├─
    


## To add any new routes in HeadNavigation
    
       <NavLink
           to='/essays/indices_essay#DRAWINGS'
           className='dropdown-item'
           onClick={this.handleMenuClick}>{navCopy.drawings}
       </NavLink>

## To establish a new catch for route

        <Route
            exact
            path='/addNews'
            component={PostNews}
        />
