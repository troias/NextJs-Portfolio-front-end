import qs from "qs"

export function getStrapiURL(path) {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
      }${path}`
  }

  /**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */

   export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
       
      },
      ...options,
    }
  
    // Build request URL
    const queryString = qs.stringify(urlParamsObject)
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`
    // console.log("requestUrl", requestUrl)
    // console.log("queryString", queryString)
    // console.log("mergedOptions", mergedOptions)
    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions)
    // console.log("response", response)
    // Handle response
    if (!response.ok) {
      // console.error(response.statusText)
      throw new Error(`An error occured please try again`)
    }
    const data = await response.json()
    // console.log("data", data)
    return data
  }

  /**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */

   export async function getPortfolioData({ slug, locale, preview }) {
    // Find the pages that match this slug
    const gqlEndpoint = getStrapiURL("/graphql")
    console.log("slug", slug)
    console.log("locale", locale)
    console.log("gqlEndpoint", gqlEndpoint)
    const pagesRes = await fetch(gqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({


        query: `
        fragment CollectionParts on UploadFileRelationResponseCollection {
          data {
            id
                attributes {
                    alternativeText
                    width
                    height
                    mime
                    url
                    formats
                  }
          }
        }
          fragment FileParts on UploadFileEntityResponse {
            data {
              id
              attributes {
                alternativeText
                width
                height
                mime
                url
                formats
              }
            }
          }

          query GetPortfolio(
            $slug: String!
            $publicationState: PublicationState!
            $locale: I18NLocaleCode!

          ) {
            portfolio(){
                data {
                    id
                  attributes {
                    title
                    backgroundColor
                    description

                }
            }
          }`,
        variables: {
            slug,
            publicationState: preview ? "PUBLISHED" : "DRAFT",
            locale,
            },
        }),
    })


    const portfolioData = await portfolioRes.json()

    if (portfolioData.errors) {
      throw new Error(portfolioData.errors)
    }
    if (portfolio.data?.portfolios = null || portfolio.data.pages.lenght === 0) {
        return null
    }

    return pagesData.data.pages

}


        

  
  