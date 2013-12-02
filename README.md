#Clickscript with EVRYTHNG support!

This is a fork of the nice [ClickScript](http://clickscript.ch/) Javascript mashup tool, the goal of this fork is to
integrate direct support for the EVRYTHNG Web of Things API into Clickscript as a showcase of how EVRYTHNG makes it easy
build Web of Things apps.


The forks adds:
* 2 EVYTHNG modules, one for reading Thng properties, one for updating them.
* A Node.js proxy to circumvent the Javascript cross-domain restrictions.

Useful if:
* You have real-world objects (e.g., a temperature sensor, a connected product) connected to EVRYTHNG and want to involve them in crazy
mashups/applications within seconds!

# Install

## Prerequisites
* [node.js](http://nodejs.org/)
* [Firefox](http://www.mozilla.org/en-US/firefox/) (many things won't work with Chrome...)
* A (free!) [EVRYTHNG API](https://dev.evrythng.com) account, API key and an existing Thng with properties (see the [API doc](https://dev.evrythng.com/documentation/api))

## Cloning the repository

    git clone git@github.com:webofthings/ClickScript.git
    
## Setting up the Node.js proxy

    cd proxy
    sudo npm install

## Configure your API key (optional)

    pico system/ConfigController.js

Add your EVRYTHNG API key and the id of the Thng you want to include in your mashups:

    evrythng : {key : "YOUR-KEY", thng : "YOUR-THNG-ID", proxyUrl : "http://localhost:8001"}

(Note that you can also set that "at run-time" by accessing the 

# Get started
    cd proxy
    node proxy.js

Browse to: 

    http://localhost:8001/wot-a-mashup.html 

The two EVRYTHNG modules are the last ones on the Clickscript IDE module bar! Enjoy!


    
