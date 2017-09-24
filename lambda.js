/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This skill calls upon the Wolfram Alpha API and is built with the Amazon Alexa Skills
 * nodejs skill development kit.

 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.b5b677ac-86b7-444f-89ca-24b02c445aea";  

var wolfram = require('wajs').createClient(APP_ID);
var results = wolfram.query("utterance");

const languageStrings = {
    'en': {
        translation: {
            FACTS: results,
            SKILL_NAME: 'Wolfexa',
            GET_FACT_MESSAGE: "Here's your solution: ",
            HELP_MESSAGE: 'You can ask me a query, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};




const handlers = {
    'LaunchRequest': function () {
        this.emit('GetWolfram');
    },
    'GetNewFactIntent': function () {
        this.emit('GetWolfram');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const WolfArr = this.t('FACTS');


        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + WolfArr;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), WolfArr);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
