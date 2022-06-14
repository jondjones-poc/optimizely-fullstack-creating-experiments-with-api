import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import FeatureComponent from '../component/FeatureComponent';
import { useRouter } from 'next/router'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const flagKey = "big_bucket";
const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = sdkKey;

export default function Home()
{
  const [rulesData, setRulesData] = useState([]);
  const router = useRouter();
  const createNewExperimentInCode = () => {

    const key = uuidv4();

    axios.patch(`https://api.optimizely.com/flags/v1/projects/${projectId}/flags/${flagKey}/environments/production/ruleset`, [
      {
        "op": "add",
        "path": `/rules/${key}`,
        "value": {
          "key": key,
          "name": key,
          "type": "a/b",
          "percentage_included": 5000,
          "metrics": [
            {
            "aggregator": "count",
            "event_id": 21684210616,
            "scope": "session",
            "winning_direction": "increasing"
            }
          ],
          "variations": {
            "off": {
              "key": "off",
              "name": "Off",
              "percentage_included": 5000
            },
            "on": {
              "key": "on",
              "name": "On",
              "percentage_included": 5000
            }
          }
        }
      },
      {
        "op": "add",
        "path": "/rule_priorities/0",
        "value": key
        }
    ]).then(() => router.reload(window.location.pathname))
    .catch(ex =>
      console.log("Failed to create experiment", ex)
    )
  }

  const  turnOffFeature = (key, router) => {
    axios.post(`https://api.optimizely.com/flags/v1/projects/${projectId}/flags/${key}/environments/production/ruleset/disabled`)
    .then(() => router.reload(window.location.pathname))
    .catch(ex =>
      console.log("Create experiment issue", ex)
    )
  }

  const  turnOnFeature = (key, router) => {
    axios.post(`https://api.optimizely.com/flags/v1/projects/${projectId}/flags/${key}/environments/production/ruleset/enabled`)
    .then(() => router.reload(window.location.pathname))
    .catch(ex =>
      console.log("Create experiment issue", ex)
    )
  }

  useEffect(() => {
    let rulesData = [];
    axios.get(`https://api.optimizely.com/flags/v1/projects/${projectId}/flags/${flagKey}/environments/production/ruleset`)
    .then((response) => {
      Object.keys(response?.data?.rules).forEach(item => {
        const tempObject = response?.data?.rules[item];
        rulesData.push(tempObject);
      });
    }).catch(ex =>
      console.log("Failed to get project data", ex)
    ).finally(() => {
      setRulesData(rulesData);
    });
  }, [projectId]);

  return (<>
    <div className="row">
      <div className="col-12">
        <div className="card">
          <h5 className="card-header">Features</h5>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                    <th scope="col">
                      Name
                    </th>
                    <th scope="col">
                      Status
                    </th>
                    <th scope="col">
                      Report Data
                    </th>
                    <th scope="col">
                      Enabled Experiment
                    </th>
                    <th scope="col">
                      Disable Experiment
                    </th>
                </tr>
              </thead>
              <tbody>
                  {rulesData && <FeatureComponent rulesData={rulesData} projectId={projectId} flagKey={flagKey} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-12">
        <div className="card">
          <h5 className="card-header">Admin Panel</h5>
          <div className="card-body">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <button onClick={createNewExperimentInCode}>
                      Create New Feature
                </button>
              </li>
              <li className="breadcrumb-item">
                <button onClick={() => turnOffFeature(flagKey, router)} className="text-md-right">
                  Turn Off Feature In Optimizely
                </button>
              </li>
              <li className="breadcrumb-item">
                <button onClick={() => turnOnFeature(flagKey, router)} className="text-md-right">
                    Turn On Feature In Optimizely
                </button>
              </li>
            </ol>
            </div>
        </div>
      </div>
    </div>
</>)
}
