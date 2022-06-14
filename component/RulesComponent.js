import React from "react";
import { useRouter } from 'next/router'

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = sdkKey;

const RulesComponent = ({ rulesData }) => {

  const router = useRouter();

  return (
    <div>
        {rulesData?.map(({ name, type, variations, enabled}, index) => (
          <div key={index}>
              <h3>{name}={enabled} on {type}</h3>
          </div>)
        )}
    </div>
  );
}

export default RulesComponent;