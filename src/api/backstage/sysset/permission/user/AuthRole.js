/**
 * 角色
 * @Author: dfzhu
 * @Date: 2020/12/8
 */
import axiosApi from "@/api/AxiosApi.js";

const apiList = {
  validRoleCodeIsSingle: {
    method: "POST",
    url: "/partycloud/authRole/validRoleCodeIsSingle"
  },
  page: {
    method: "POST",
    url: "/partycloud/authRole/page"
  }
};

export default {
  validRoleCodeIsSingle(data) {
    return axiosApi({
      ...apiList.validRoleCodeIsSingle,
      data
    });
  },
  page(data) {
    return axiosApi({
      ...apiList.page,
      data
    });
  }
};
