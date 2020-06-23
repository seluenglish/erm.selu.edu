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

## To establish a new catch for route --App.js 
        <Route
            exact
            path='/addNews'
            component={PostNews}
        />
        
#Backend APi EndPoint

    src
    ├---app/components
    |---server
    |---|---serverHelpers
    |---|---components
    |---|---database
    |---|---middleware
    |---|---api
    |---|---|---index.js                #This is where 
    |---|---|---NewsPortal              #Controler of news portal located
    |---|---router.js                   # Controllers are registered with the routes


#While Defining a route in backend
###make sure that you define route in following order
        
   
    rootRouter
        .use(apiRouter.routes())
        /* render error page when problem found */
        .get('/getNews', ctx=>getNews(ctx) )
        .post('/createNews', ctx=>setNews(ctx) )

###Before the following route or else the app will render a page not api        
        .get('error', '/oops', renderReactApp)
        /* render react app for all other routes */
        .get('react', '/(.*)', renderReactApp)

### Get the data in post request:
    ctx.request.body
