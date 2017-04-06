'use strict';
import mongoosePaginate from 'mongoose-paginate';

export default function initPaginate(){
  mongoosePaginate.paginate.options = {
    lean:  true,
    limit: 50
  };
}
