# gridsome-source-notion

> Notion source for Gridsome.<br />
> Warning: This plugin is experimental, use at your own risk.


## Install

- `npm install gridsome-source-notion`
- `yarn add gridsome-source-notion`

## Usage

```
module.exports = {
  plugins: [
    {
      use: "gridsome-source-notion",
      options: {
        notionKey: "YOUR_NOTION_INTEGRATION_KEY",
        notionToken: "YOUR_NOTION_USER_TOKEN",
        databaseId: "YOUR_DATABASE_ID",
        typeName: "Post"
      },
    },
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      plugins: ["@gridsome/remark-prismjs"],
    },
  },
};
```

## Configuration
### Setup
You'll first need to create an integration with Notion's API. The full process is detailed [here](https://developers.notion.com/docs/getting-started).

You'll then need to create a new database to use for your blog. We suggest creating a table or list view as those will be the easiest
to manage inside Notion.

<ins>Important</ins>: You'll need to share your newly created database with your integration or the plugin won't be able to find your pages.

### Options
1. `notionKey`: Your integration secret key.
2. `databaseId`: The ID of the database you want to use with 
3. `tokenId`: This plugin currently uses `notion-exporter` under the hood to retrieve Markdown exports of your pages, and as such uses an internal API 
which doesn't use the notion integration key. You'll need to follow [this](https://www.npmjs.com/package/notion-exporter#token--block-ids) document to
obtain a token ID for your account.
