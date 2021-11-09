const { default: NotionExporter } = require("notion-exporter");
const { Client: NotionClient } = require('@notionhq/client');


module.exports = class NotionSource {
  static defaultOptions() {
    return {
      baseUrl: '',
      notionKey: '',
      notionToken: '',
      databaseId: '',
      perPage: 100,
      typeName: 'Notion'
    }
  }

  constructor (api, options) {
    this.api = api
    this.options = options

    this.notionApi = new NotionClient({ auth: this.options.notionKey });


    api.loadSource(async actions => {
      const collection = actions.addCollection({
        typeName: this.options.typeName,
      });
      await this.loadPagesToCollection(collection)
    })
  }

  async loadPagesToCollection(collection) {
    const response = await this.notionApi.databases.query({
      database_id: this.options.databaseId,
    });
    let count = 1;
    for (const block of response.results) {
      //console.log(block)
      let content = await new NotionExporter(this.options.notionToken).getMdString(block.id);
      //console.log(content)
      content = this.removeProperties(content, block.properties);
      console.log(block.properties);
      collection.addNode({
        id: block.id,
        path: `/${count++}/`,
        properties: {
          ...block.properties
        },
        internal: {
          mimeType: 'text/x-markdown',
          content,
          origin: block.url
        },
      })
    }
  }

  removeProperties(content, properties) {
    const lines = content.split('\n');
    for (let p of Object.keys(properties)) {
      const pindex = lines.findIndex((l) => l.startsWith(p));
      if (pindex !== -1) {
        lines.splice(pindex, 2);
      }
    }
    return lines.join('\n');
  }
}

