// widths and padding
var canvasWidth = 1000; // this will be the exported width of the image
var elementPadding = 40; // padding around the logo and credit text

// logo configuration
// the name of the logo object should match the value of the corresponding radio button in the HTML.
var logos = {
    'lunchbox': {
        whitePath: '../img/alta_aosfatos_negativo.png', // path to white logo
        blackPath: '../img/alta_aosfatos_cor.png', // path to black logo
        w: 100, // width of logo
        h: 100, // height of logo
        display: 'Lunchbox'
    },
    'socializr': {
        whitePath: '../img/selos/vazio.png',
        blackPath: '../img/selos/vazio.png',
        w: 150,
        h: 51,
        display: 'Sem logo'
    }
};

// logo opacity for colors
var whiteLogoAlpha = '0.8';
var blackLogoAlpha = '0.6';

// type
var fontWeight = 'Bold'; // font weight for credit
var fontSize = '22pt'; // font size for credit
var fontFace = "Source Sans Pro"; // font family for credit
var fontShadow = 'rgba(0,0,0,0.7)'; // font shadow for credit
var fontShadowOffsetX = 0; // font shadow offset x
var fontShadowOffsetY = 0; // font shadow offset y
var fontShadowBlur = 10; // font shadow blur

// copyright options
var orgName = 'Aos Fatos';
var freelanceString = 'para ' + orgName;

var copyrightOptions = {
    'internal': {
        showPhotographer: true, // show the photographer input box
        showSource: false, // show the source input box
        photographerRequired: false, // require a photographer
        sourceRequired: false, // require a source
        source: orgName, // How the source should appear on the image, e.g. 'NPR'
        display: orgName, // How the option will appear in the dropdown menu
    },
    'freelancer': {
        showPhotographer: true,
        showSource: false,
        photographerRequired: true,
        sourceRequired: false,
        source: freelanceString,
        display: 'Freelancer'
    },
    'abr': {
        showPhotographer: true,
        showSource: false,
        photographerRequired: false,
        sourceRequired: false,
        source: 'Agência Brasil',
        display: 'Agência Brasil'
    },
    'camara': {
        showPhotographer: true,
        showSource: false,
        photographerRequired: false,
        sourceRequired: false,
        source: 'Agência Câmara',
        display: 'Agência Câmara'
    },
    'senado': {
        showPhotographer: true,
        showSource: false,
        photographerRequired: false,
        sourceRequired: false,
        source: 'Agência Senado',
        display: 'Agência Senado'
    },
    'thirdParty': {
        showPhotographer: true,
        showSource: true,
        photographerRequired: false,
        sourceRequired: true,
        source: 'Divulgação',
        display: 'Divulgação'
    }
}

// app load defaults
var currentCrop = 'twitter'; // default crop size
var currentLogo = 'lunchbox'; // default logo slug
var currentLogoColor = 'white'; // default logo color
var currentTextColor = 'white'; // default text color
var defaultImage = '../img/banner_AF_preto_2.jpg'; // path to image to load as test image
var defaultLogo = logos[currentLogo]['whitePath'] // path to default logo
