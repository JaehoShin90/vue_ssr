const fs = require('fs');
const {join} = require('path');

// CSR 템플릿 파일
const csrTemplatePath = join(process.cwd(), 'template/index.html');
const csrTemplate = fs.readFileSync(csrTemplatePath, 'utf-8');

module.exports = {
    async getHtml(context) {
        return csrTemplate;
    }
}