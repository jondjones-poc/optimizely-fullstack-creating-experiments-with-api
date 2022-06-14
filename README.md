# Optimizely Fullstack Creating Experiments With API -  By Jon D Jones 💥

This project makes uses of NextJs, Fullstack and Optimizely Rest API.

## Live Site URL & Status 👺

- [Website](https://optimizely-fullstack-creating-experiments-with-api.netlify.app/)
- [Github](https://github.com/jondjones-poc/optimizely-fullstack-creating-experiments-with-api)

[![Netlify Status](https://api.netlify.com/api/v1/badges/582487fd-cb1a-4bab-b3e3-ab76bc4e3cd3/deploy-status)](https://app.netlify.com/sites/optimizely-fullstack-creating-experiments-with-api/deploys)

## How To Use ☄️

First, run the development server:

```bash
npm run dev
```

## Useful Documentation 📄

- 🔗 [Create New Flag](https://library.optimizely.com/docs/api/flags/v1/index.html#operation/create_flag)
- 🔗 [Update Ruleset](htps://library.optimizely.com/docs/api/flags/v1/index.html#operation/update_ruleset)


## Sample API json

```json
{
    "project_id": 21665871822,
    "key": "my_key",
    "name": "A Name",
    "description": "description",
    "type": "a/b",
    "holdback": 0,
    "audience_conditions": "everyone",
    "feature_key": "big_bucket",
    "metrics": [
        {
        "aggregator": "count",
        "event_id": 21684210616,
        "scope": "session",
        "winning_direction": "increasing"
        }
    ],
      "variations": [
            {
            "actions": [],
            "archived": true,
            "description": "string",
            "feature_enabled": true,
            "key": "blue_button_variation",
            "name": "Blue Button",
            "status": "active",
            "variable_values": {},
            "variation_id": 0,
            "weight": 10000
            }
    ]
}
```
