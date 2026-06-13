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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF5RDtBQUN6RCxpREFBdUM7QUFJaEMsSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQVN4QjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxzQkFBTSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksZ0JBQWdCO1lBQ3hELEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksTUFBTTtTQUM3QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWEsRUFBRSxPQUFhO1FBQzVDLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDL0IsS0FBSztvQkFDTCxJQUFJLEVBQUUsT0FBTztpQkFDZCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLHVCQUF1QixDQUFDLENBQUM7YUFDekQ7U0FDRjtRQUFDLE9BQU8sS0FBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixLQUFLLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRCxNQUFNLEtBQUssQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0VBQWtFO0lBQ2xF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