const path = require("path");
const glob = require("glob");
const fs = require("fs");
const axios = require("axios");

// If you use Dotenv you can include your .env variables uncommenting the following line
// require("dotenv").config();

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// SITE_ROOT is the domain of your app
// Update example.com with your domain or set the env variable
const SITE_ROOT = process.env.SITE_ROOT || "http://localhost:3000/";

// SOURCE is where are stored all pages files
// By default it tracks all files in the pages folder
// without considering the ones starting with `_` (e.g. _document.js and _app.js)
const SOURCE =
  process.env.SOURCE || path.join(resolveApp("pages"), "/**/!(_*).js");

// API_SOURCE is the endpoint of you api
// Update example.com/api with your endpoint or set the env variable
const API_SOURCE = process.env.API_SOURCE || "http://localhost:3000/data";

// DESTINATION is where the real file is exported
// By default is .next/static/sitemap.xml

const PAGE_DESTINATION =
  process.env.DESTINATION ||
  path.join(resolveApp(".next/static"), "search-result-page.xml");
  
const SITEMAP_DESTINATION =
    process.env.DESTINATION ||
    path.join(resolveApp(".next/static"), "sitemap.xml");

const PRODUCT_DESTINATION =
  process.env.PRODUCT_DESTINATION ||
  path.join(resolveApp(".next/static"), "product.xml");

const createSitemapPages = () => {

  let time = [];
  let diskPages = glob.sync(SOURCE);
  let xml = "";
  xml += '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  diskPages.forEach(page => {
    let stats = fs.statSync(page);
    let modDate = new Date(stats.mtime);
    let lastMod = `${modDate.getFullYear()}-${(
      "0" +
      (modDate.getMonth() + 1)
    ).slice(-2)}-${("0" + modDate.getDate()).slice(-2)}`;
    time.push(lastMod);
  });

  return axios
    .get(API_SOURCE)
    .then(resp => {
      let { categories, models, brands, families, series } = resp.data;
      let count = -1; 
      categories.map(category => {
          if(!category.parent_ID){
            xml += "<url><loc>";
            xml += `${SITE_ROOT}/${category.slug}`;
            xml +=
                `</loc></url>`;
          }
          else{
              let subcategory = category;
              categories.map(category => {
                  if(subcategory.parent_ID === category.ID){
                    xml += "<url><loc>";
                    xml += `${SITE_ROOT}/${category.slug}/${subcategory.slug}`;
                    xml +=
                        `</loc></url>`;
                  }
              })
          }
      })
      brands.map((brand, key) => {
        xml += "<url><loc>";
        xml += `${SITE_ROOT}/${brand.slug}`;
        xml +=
            `</loc></url>`;
          families.map(family => {
              if(brand.ID === family.parent_ID){
                xml += "<url><loc>";
                xml += `${SITE_ROOT}/${brand.slug}/${family.slug}`;
                xml +=
                    `</loc></url>`;
                  series.map((series) => {
                      if(family.ID === series.parent_ID){
                        count++;
                        xml += "<url><loc>";
                        xml += `${SITE_ROOT}/${brand.slug}/${series.slug}`;
                        xml +=
                        `</loc></url>`;
                      }
                  })
              }
          })
      })
      if (count === series.length - 1) {
        xml += "</urlset>";   
      }
      return xml;
    })
    .catch(error => {
      console.log(error.message, error.name);
    });
};

const createSitemapProducts = () => {

    let time = [];
    let diskPages = glob.sync(SOURCE);
    let xml = "";
    xml += '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  
    diskPages.forEach(page => {
      let stats = fs.statSync(page);
      let modDate = new Date(stats.mtime);
      let lastMod = `${modDate.getFullYear()}-${(
        "0" +
        (modDate.getMonth() + 1)
      ).slice(-2)}-${("0" + modDate.getDate()).slice(-2)}`;
      time.push(lastMod);
    });
  
    return axios
      .get(API_SOURCE)
      .then(resp => {
        let { models, brands, families, series } = resp.data;
        let count = -1; 
        brands.map((brand, key) => {
            families.map(family => {
                if(brand.ID === family.parent_ID){
                    series.map(series => {
                        if(family.ID === series.parent_ID){
                            models.map(model => {
                                if(series.ID === model.parent_ID){
                                  count++;
                                  xml += "<url><loc>";
                                  xml += `${SITE_ROOT}/${brand.slug}/${model.slug}`;
                                  xml +=
                                    `</loc></url>`;
                                }
                            });
                        }
                    })
                }
            })
        })
        if (count === models.length - 1) {
          xml += "</urlset>";   
        }
        return xml;
      })
      .catch(error => {
        console.log(error.message, error.name);
      });
  };
  const createSitemap = () => {
    let xml = "";
    xml += '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    xml += "<url><loc>";
    xml += `${SITE_ROOT}/search-result-page.xml`;
    xml +=
      `</loc></url>`;
    
    xml += "<url><loc>";
    xml += `${SITE_ROOT}/products.xml`;
    xml +=
    `</loc></url>`;

    xml += "</urlset>"
    return xml;
  }
module.exports = { PAGE_DESTINATION, createSitemapPages, PRODUCT_DESTINATION, createSitemapProducts, createSitemap, SITEMAP_DESTINATION };