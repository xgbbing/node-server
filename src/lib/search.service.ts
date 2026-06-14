import { Provide, Inject, Logger, ILogger } from '@midwayjs/core';
import { Client } from 'elasticsearch';

@Provide()
export class SearchService {
  @Logger()
  logger!: ILogger;

  private client: Client;

  @Inject()
  config;

  constructor() {
    this.client = new Client({
      host: this.config.elasticsearch.host || 'localhost:9200',
      log: this.config.elasticsearch.log || 'info',
    });
  }

  /**
   * 创建索引
   */
  async createIndex(index: string, mapping?: any) {
    try {
      const exists = await this.client.indices.exists({ index });
      if (!exists) {
        await this.client.indices.create({
          index,
          body: mapping,
        });
        this.logger.info(`Index ${index} created successfully`);
      }
    } catch (error: any) {
      this.logger.error(`Error creating index ${index}:`, error);
      throw error;
    }
  }

  /**
   * 索引文档
   */
  // async indexDocument(index: string, id: string, document: any) {
  //   try {
  //     const result = await this.client.index({
  //       index,
  //       id,
  //       body: document,
  //     });
  //     this.logger.info(`Document ${id} indexed successfully`);
  //     return result;
  //   } catch (error: any) {
  //     this.logger.error(`Error indexing document ${id}:`, error);
  //     throw error;
  //   }
  // }

  /**
   * 搜索文档
   */
  async search(index: string, query: any) {
    try {
      const result = await this.client.search({
        index,
        body: {
          query,
        },
      });
      return result.hits;
    } catch (error: any) {
      this.logger.error(`Error searching in index ${index}:`, error);
      throw error;
    }
  }

  /**
   * 获取文档
   */
  // async getDocument(index: string, id: string) {
  //   try {
  //     const result: any = await this.client.get({
  //       index,
  //       id,
  //     });
  //     return result._source;
  //   } catch (error: any) {
  //     if (error.statusCode === 404) {
  //       return null;
  //     }
  //     this.logger.error(`Error getting document ${id}:`, error);
  //     throw error;
  //   }
  // }

  /**
   * 更新文档
   */
  // async updateDocument(index: string, id: string, document: any) {
  //   try {
  //     const result = await this.client.update({
  //       index,
  //       id,
  //       body: {
  //         doc: document,
  //       },
  //     });
  //     this.logger.info(`Document ${id} updated successfully`);
  //     return result;
  //   } catch (error: any) {
  //     this.logger.error(`Error updating document ${id}:`, error);
  //     throw error;
  //   }
  // }

  /**
   * 删除文档
   */
  // async deleteDocument(index: string, id: string) {
  //   try {
  //     const result = await this.client.delete({
  //       index,
  //       id,
  //     });
  //     this.logger.info(`Document ${id} deleted successfully`);
  //     return result;
  //   } catch (error: any) {
  //     this.logger.error(`Error deleting document ${id}:`, error);
  //     throw error;
  //   }
  // }

  /**
   * 批量索引文档
   */
  async bulkIndex(index: string, documents: Array<{ id: string; document: any }>) {
    try {
      const body: Array<any> = [];
      for (const item of documents) {
        body.push({ index: { _index: index, _id: item.id } });
        body.push(item.document);
      }

      const result = await this.client.bulk({ body });
      this.logger.info(`${documents.length} documents bulk indexed successfully`);
      return result;
    } catch (error: any) {
      this.logger.error('Error during bulk indexing:', error);
      throw error;
    }
  }
}