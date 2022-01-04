/* 自定义组件 */

import BaseLabelBox from "./base-label-box";
import BasePagination from "./base-pagination";
import BaseTableA from "./base-table-a";
import BaseCardBox from "./base-card-box";
import BasePageTree from "./base-page-tree";
import BasePageButton from "./base-page-button";
import BaseTableEmpty from "./base-table-empty";
import BaseDpTableEmpty from "./base-dptable-empty";
import BaseFileUpload from "./base-file-upload";
import BaseOrgTree from "./base-org-tree";
import BaseOrgImport from "./base-org-import";
import BaseTinymceEditor from "./base-tinymce-editor";
import BaseTelephone from "./base-telephone";
import BaseTooltip from "./base-tooltip";

const components = [
  BaseLabelBox,
  BasePagination,
  BaseTableA,
  BaseCardBox,
  BasePageTree,
  BasePageButton,
  BaseTableEmpty,
  BaseDpTableEmpty,
  BaseFileUpload,
  BaseOrgTree,
  BaseOrgImport,
  BaseTinymceEditor,
  BaseTelephone,
  BaseTooltip
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
