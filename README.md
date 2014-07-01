#WoT-a-Mashup! 
## A Physical Mashup Tool with EVRYTHNG support!

WoT-a-Mashup is a mashup tool for the Internet of Things and the Web of Things. It was the first tool of this kind and is built around the idea of [Physical Mashups](http://www.webofthings.org/2010/09/11/mashing-up-homes/).

It is based on the great [ClickScript](http://clickscript.ch/) Javascript mashup tool, and integrates direct support for the EVRYTHNG Web of Things API into Clickscript as a showcase of how EVRYTHNG makes it easy
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

## Configure your EVRYTHNG API key in

    cs/system/ConfigController.js

Add your EVRYTHNG API key and the id of the Thng you want to include in your mashups:

    evrythng : {key : "YOUR-KEY", thng : "YOUR-THNG-ID", proxyUrl : "http://localhost:8001"}

# Get started
    cd proxy
    node proxy.js

Browse to: 

    http://localhost:8001/wot-a-mashup.html 
    
# Writing your own module

You can create you own mashup modules (little boxes) by 

The two EVRYTHNG modules are the last ones on the Clickscript IDE module bar! Enjoy!


    
