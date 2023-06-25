//  Paginate API
/**
 * @constant {number}
 * @default
 * @category Paginate Constants
 */
export const PAGINATE_INIT = 0;
/**
 * @constant {number}
 * @default
 * @category Paginate Constants
 */
export const PAGINATE_PENDING = -1;
/**
 * @constant {number}
 * @default
 * @category Paginate Constants
 */
export const PAGINATE_UPDATED = 1;
/**
 * @constant {number}
 * @default
 * @category Paginate Constants
 */
export const PAGINATE_END = 2;
/**
 * @constant {number}
 * @default
 * @category Paginate Constants
 */
export const PAGINATE_DEFAULT = 10;
/**
 * @typedef {
 * PAGINATE_INIT
 * |PAGINATE_PENDING
 * |PAGINATE_UPDATED
 * |PAGINATE_DEFAULT} PagingStatus
 * @category Paginate Constants
 */
/**
 * @constant {Array.number}
 * @default
 * @category Paginate Constants
 */
export const PAGINATE_CHOICES = [10, 25, 50, 100, 250, 500];
