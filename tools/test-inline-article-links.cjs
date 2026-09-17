const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const source = fs.readFileSync('src/app/blog/InlineArticleText.tsx', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: {
  jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
  esModuleInterop: true,
}}).outputText;
const mod = { exports: {} };
vm.runInNewContext(compiled, { exports: mod.exports, module: mod, require, URL });
const render = text => renderToStaticMarkup(React.createElement(mod.exports.default, { children: text }));
assert.match(render('Приходите https://iamagency.su/kontakty'), /href="https:\/\/iamagency.su\/kontakty"/);
assert.match(render('[Контакты](/kontakty)'), /href="\/kontakty"[^>]*>Контакты<\/a>/);
assert.equal((render('[Сайт](https://example.com) https://example.org').match(/<a /g) || []).length, 2);
assert.match(render('Сайт (https://example.com).'), /href="https:\/\/example.com"/);
assert.match(render('https://example.com/a_(b)'), /href="https:\/\/example.com\/a_\(b\)"/);
assert.match(render('https://example.com/?a=1&b=2'), /href="https:\/\/example.com\/\?a=1&amp;b=2"/);
assert.doesNotMatch(render('[Опасно](javascript:alert) [Опасно](data:text/html,abc)'), /<a /);
assert.doesNotMatch(render('<script>alert(1)</script>'), /<script>/);
assert.equal(render('Просто текст'), 'Просто текст');
console.log('9 inline link checks passed');
