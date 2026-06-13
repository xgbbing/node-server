"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const core_1 = require("@midwayjs/core");
const elasticsearch_1 = require("elasticsearch");
let SearchService = class SearchService {
    constructor() {
        this.client = new elasticsearch_1.Client({
            host: this.config.elasticsearch.host || 'localhost:9200',
            log: this.config.elasticsearch.log || 'info',
        });
    }
    /**
     * 创建索引
     */
    async createIndex(index, mapping) {
        try {
            const exists = await this.client.indices.exists({ index });
            if (!exists) {
                await this.client.indices.create({
                    index,
                    body: mapping,
                });
                this.logger.info(`Index ${index} created successfully`);
            }
        }
        catch (error) {
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
    async search(index, query) {
        try {
            const result = await this.client.search({
                index,
                body: {
                    query,
                },
            });
            return result.hits;
        }
        catch (error) {
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
    async bulkIndex(index, documents) {
        try {
            const body = [];
            for (const item of documents) {
                body.push({ index: { _index: index, _id: item.id } });
                body.push(item.document);
            }
            const result = await this.client.bulk({ body });
            this.logger.info(`${documents.length} documents bulk indexed successfully`);
            return result;
        }
        catch (error) {
            this.logger.error('Error during bulk indexing:', error);
            throw error;
        }
    }
};
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], SearchService.prototype, "logger", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], SearchService.prototype, "config", void 0);
SearchService = __decorate([
    (0, core_1.Provide)(),
    __metadata("design:paramtypes", [])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FsaWNlL0Rlc2t0b3Avb3RoZXJjb2RlL25vZGUtc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2guc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUQ7QUFDekQsaURBQXVDO0FBSXZDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFTeEI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksc0JBQU0sQ0FBQztZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLGdCQUFnQjtZQUN4RCxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLE1BQU07U0FDN0MsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFhLEVBQUUsT0FBYTtRQUM1QyxJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQy9CLEtBQUs7b0JBQ0wsSUFBSSxFQUFFLE9BQU87aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0Y7UUFBQyxPQUFPLEtBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsS0FBSyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0QsTUFBTSxLQUFLLENBQUM7U0FDYjtJ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