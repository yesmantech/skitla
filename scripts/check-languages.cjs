const { chromium }=require('C:/Users/skitl/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),assert=require('node:assert/strict');
const base=process.env.TEST_SITE || 'http://127.0.0.1:8774';
const output='../../outputs/site-languages';fs.mkdirSync(output,{recursive:true});
(async()=>{
const browser=await chromium.launch({headless:true});const result=[];
for(const [locale,lang] of [['it-IT','it'],['en-US','en'],['ar-AE','ar'],['zh-CN','zh'],['ru-RU','ru'],['fr-FR','en']]){
 const context=await browser.newContext({locale,viewport:{width:390,height:844},reducedMotion:'reduce'}); const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.dataset.languageReady==='true');await page.waitForTimeout(2900);
 assert.equal(await page.locator('html').getAttribute('lang'),lang); assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
 assert.equal(await page.locator('select').inputValue(),lang);
 await page.locator('header button').click();await page.getByRole('link',{name:'Gold',exact:true}).last().click();await page.waitForURL('**/gold/**');await page.waitForTimeout(3200);
 assert.equal(await page.locator('html').getAttribute('lang'),lang);
 assert.equal(await page.locator('main a[href="https://t.me/+Zb1zz0M4O5M4ZDY0"]').count(),1);
 assert.ok(await page.locator('main h1').innerText());
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,locale+' Gold overflow');
 if(locale!=='fr-FR')await page.screenshot({path:output+'/gold-'+lang+'-mobile.png'});
 await page.locator('select').selectOption('en');await page.waitForFunction(()=>document.documentElement.lang==='en');
 await page.reload({waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.lang==='en');
 await page.goto(base+'/',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.lang==='en');
 const text=await page.locator('body').innerText();fs.writeFileSync(output+'/home-en.txt',text);
 assert.ok(text.toLowerCase().includes('my net result'));assert.ok(!text.includes('Il mio risultato netto'));assert.ok(text.includes('Frequently asked questions'));
 const homeOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(homeOverflow,false,locale+' Home overflow');
 assert.deepEqual(errors,[]);result.push({locale,lang,auto:true,goldNavigation:true,remembered:true,noOverflow:true});await context.close();
}
const context=await browser.newContext({locale:'it-IT',viewport:{width:1440,height:1000}});const page=await context.newPage();
await page.goto(base+'/?lang=ar',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.lang==='ar');await page.waitForTimeout(2900);
await page.locator('#stats').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);await page.screenshot({path:output+'/home-ar-desktop.png'});
await page.goto(base+'/gold-start.html?lang=ru',{waitUntil:'networkidle'});await page.waitForURL('**/gold/**');await page.waitForFunction(()=>document.documentElement.lang==='ru');
await page.goto(base+'/?lang=en',{waitUntil:'networkidle'});await page.waitForTimeout(3000);await page.locator('#stats').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);await page.screenshot({path:output+'/home-en-desktop.png'});
await browser.close();fs.writeFileSync(output+'/checks.json',JSON.stringify(result,null,2));console.log(JSON.stringify({passed:result,legacyRedirect:true,explicitLanguage:true}));
})().catch(e=>{console.error(e);process.exit(1)});

