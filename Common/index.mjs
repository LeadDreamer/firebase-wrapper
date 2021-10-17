//  Paginate API
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_INIT = 0;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_PENDING = -1;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_UPDATED = 1;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_END = 2;
/**
 * @constant {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_DEFAULT = 10;
/**
 * @private
 * @typedef {
 * PAGINATE_INIT
 * |PAGINATE_PENDING
 * |PAGINATE_UPDATED
 * |PAGINATE_DEFAULT} PagingStatus
 * @category Paginate Constants
 */
/**
 * @type {number}
 * @static
 * @category Paginate Constants
 */
export const PAGINATE_CHOICES = [10, 25, 50, 100, 250, 500];
