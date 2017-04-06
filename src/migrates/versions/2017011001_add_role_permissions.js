import { Permission } from '../../models/yy';
export default {
  up: function(){
    const pms = [{
      name: '角色查看', key: 'roles_read', permissions: [
        {path: 'roles', f_path: 'roles', method: 'GET'},
        {path: 'roles/\\w+', method: 'GET'}
      ]},{
        name: '角色编辑', key: 'roles_edit', permissions: [
          {path: 'roles/\\w+', method: 'PUT'},
        ]
      },{
        name: '角色添加', key: 'roles_add', permissions: [
          {path: 'roles', method: 'post'},
        ]
      },{
        name: '角色删除', key: 'roles_delete', permissions: [
          {path: 'roles/\\w+', method: 'DELETE'}
        ]
      }
    ];
    pms.map(async pm => {
      var permission = new Permission(pm);
      return await permission.save();
    })
    return true
  },
  down: function(){
  }
}
