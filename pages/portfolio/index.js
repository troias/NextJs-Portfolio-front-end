import React from 'react';
import { getPortfolios } from '../../utils/api';
import PropTypes from 'prop-types';

const Index = (props) => {
  console.log("props portfolio", props)
  const { portfolios } = props;
  console.log("portfolios", portfolios)


  return <div class="container">
    {portfolios.map(portfolio => {
      console.log("portfolio", portfolio)
      return <div className="font-sans mb-5">
        <div className="p-2 w-full">
        <h1>{portfolio.attributes.title}</h1>
          </div>
          <div className={"bg-pink-400 "}>
            {portfolio.attributes.background}
          </div>
        <p className="text-red-600">{portfolio.attributes.description}</p>
      </div>
    }
    )}

  </div>;
};

export async function getStaticProps({ params }) {
  console.log("params", params)
  // { slug: params.slug, locale: "en", preview }
  const data = await getPortfolios();

  //  const portfolios = data.portfolios.data;
  console.log("portfolios get Static props", data.data)
  return {
    props: {
      portfolios: data.data
    },
  };
}

export default Index;

Index.propTypes = {
  portfolios: PropTypes.array.isRequired,
};

