import { ObjectId } from 'mongoose';
import { CreatedModel, CreatedOrUpdateModel, DatabaseOperationCommand, RemovedModel, UpdatedModel } from '../../types';

export abstract class IBaseRepository<T> {
  abstract save<TOptions = unknown>(document: T, saveOptions?: TOptions): Promise<CreatedModel>;
  abstract create(document: T): Promise<T>;

  abstract createOrUpdate<TUpdate = Partial<T>, TOptions = unknown>(
    updated: TUpdate,
    options?: TOptions
  ): Promise<CreatedOrUpdateModel>;

  abstract insertMany<TOptions = unknown>(document: T[], saveOptions?: TOptions): Promise<void>;

  abstract findById<TOpt = unknown>(_id: ObjectId | number, options?: TOpt): Promise<T | null>;

  abstract findAll<TQuery = Partial<T>, TOpt = unknown>(filter?: TQuery, opt?: TOpt): Promise<T[]>;

  abstract find<TQuery = Partial<T>, TOptions = unknown>(filter: TQuery, options?: TOptions | null): Promise<T[]>;

  abstract findIn<TOptions = unknown>(
    filter: { [key in keyof Partial<T>]: string[] },
    options?: TOptions | null
  ): Promise<T[]>;

  abstract findByCommands<TOptions = unknown>(
    filterList: DatabaseOperationCommand<T>[],
    options?: TOptions | null
  ): Promise<T[]>;

  abstract remove<TQuery = Partial<T>, TOpt = unknown>(filter: TQuery, opt?: TOpt): Promise<RemovedModel>;

  abstract findOne<TQuery = Partial<T>, TOptions = unknown>(filter: TQuery, options?: TOptions): Promise<T | null>;

  abstract updateOne<TQuery = Partial<T>, TUpdate = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions
  ): Promise<UpdatedModel>;

  abstract findOneAndUpdate<TQuery = Partial<T>, TUpdate = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions
  ): Promise<T | null>;

  abstract updateMany<TQuery = Partial<T>, TUpdate = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions
  ): Promise<UpdatedModel>;

  abstract findOneWithExcludeFields<TQuery = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    excludeProperties: Array<keyof T>,
    options?: TOptions
  ): Promise<T | null>;

  abstract findAllWithExcludeFields<TQuery = Partial<T>, TOptions = unknown>(
    excludeProperties: Array<keyof T>,
    filter?: TQuery | null,
    options?: TOptions
  ): Promise<T[]>;

  abstract findOneWithSelectFields<TQuery = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    includeProperties: Array<keyof T>,
    options?: TOptions
  ): Promise<T | null>;

  abstract findAllWithSelectFields<TQuery = Partial<T>, TOptions = unknown>(
    includeProperties: Array<keyof T>,
    filter?: TQuery | null,
    options?: TOptions
  ): Promise<T[]>;
}
