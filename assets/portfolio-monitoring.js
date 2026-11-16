(()=>{'use strict';
const $=id=>document.getElementById(id);
const sectors=['Distribution','Manufacturing','Business Services','Retail','Transportation','Healthcare Services'];
const customers=['Aster','Bay','Cedar','Delta','Evergreen','Finch','Granite','Harbor','Inlet','Juniper','Keystone','Lark','Meridian','Northstar','Orion','Pioneer','Quarry','Riverton','Summit','Tidewater','Union','Vantage','Westport','Yellowfin'];
// Controlled, deterministic fictional facility sample. None of these are real borrower records.
const loans=customers.map((name,i)=>({id:'FAC-'+String(i+1).padStart(3,'0'),name:name+' Example LLC',sector:sectors[i%sectors.length],exposure:180000+((i*73)%11)*86000,cash:132000+((i*29)%13)*16000,debt:88000+((i*23)%9)*18000}));
const scenarios={base:{cash:1,debt:1,label:'Base'},moderate:{cash:.92,debt:1.05,label:'Moderate stress'},severe:{cash:.82,debt:1.12,label:'Severe stress'}};
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
const compact=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:1,notation:'compact'}).format(n);
const ratio=n=>n.toFixed(2)+'×';
let latest=[],memo='';
function csv(rows){const encode=v=>'"'+String(v).replaceAll('"','""')+'"';const payload=rows.map(row=>row.map(encode).join(',')).join('\r\n');const blob=new Blob([payload],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='fictional-commercial-credit-watchlist.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),0)}
function refresh(){const scenario=scenarios[$('monitor-scenario').value],min=Number($('monitor-threshold').value),industry=$('monitor-sector').value,status=$('monitor-status').value;
 const evaluated=loans.map(loan=>{const cash=loan.cash*scenario.cash,debt=loan.debt*scenario.debt,coverage=cash/debt,headroom=coverage-min,flag=headroom<0?'Breach':headroom<.15?'Watch':'Healthy';return {...loan,cash,debt,coverage,headroom,flag}});
 const filtered=evaluated.filter(loan=>(industry==='all'||loan.sector===industry)&&(status==='all'||loan.flag===status));
 const rank={Breach:0,Watch:1,Healthy:2};filtered.sort((a,b)=>rank[a.flag]-rank[b.flag]||a.headroom-b.headroom);
 const counts={Breach:0,Watch:0,Healthy:0};filtered.forEach(x=>counts[x.flag]++);
 const total=filtered.length,exposure=filtered.reduce((a,x)=>a+x.exposure,0),flagged=counts.Breach+counts.Watch;
 $('monitor-count').textContent=total.toLocaleString('en-US');$('monitor-exposure').textContent=compact(exposure);$('monitor-alerts').textContent=flagged.toLocaleString('en-US');$('monitor-caption').textContent=`${total} fictional facilities in current view`;
 const bar=$('monitor-risks');bar.replaceChildren();const palettes={Breach:'#be6b5c',Watch:'#ddaf63',Healthy:'#67988d'};
 for(const key of ['Breach','Watch','Healthy']){if(total&&counts[key]){const el=document.createElement('span');el.style.width=(100*counts[key]/total)+'%';el.style.background=palettes[key];bar.appendChild(el)}}
 bar.setAttribute('aria-label',`${counts.Breach} below threshold, ${counts.Watch} in watch range, ${counts.Healthy} above watch range`);
 $('monitor-risk-counts').textContent=`${counts.Breach} below threshold · ${counts.Watch} watch · ${counts.Healthy} above range`;
 $('monitor-narrative').textContent=total?`${scenario.label} across ${total} displayed facilities: ${flagged} meet the illustrative follow-up criteria, representing ${money(filtered.filter(x=>x.flag!=='Healthy').reduce((sum,x)=>sum+x.exposure,0))} of fictional outstanding exposure. Verify covenant language and source reports before escalation.`:'No facilities match the combination of filters. Clear a filter to restore the view.';
 const rows=$('monitor-rows');rows.replaceChildren();
 filtered.forEach(loan=>{const tr=document.createElement('tr');for(const cell of [loan.id,loan.sector,money(loan.exposure),ratio(loan.coverage),(loan.headroom>=0?'+':'')+ratio(loan.headroom)]){const td=document.createElement('td');td.textContent=cell;tr.appendChild(td)}const statusCell=document.createElement('td'),token=document.createElement('span');token.className='status-token token-'+loan.flag.toLowerCase();token.textContent=loan.flag==='Breach'?'Below threshold':loan.flag==='Watch'?'Watch range':'Above range';statusCell.appendChild(token);tr.appendChild(statusCell);rows.appendChild(tr)});
 latest=[['Facility ID','Fictional borrower','Industry','Outstanding ($)','Cash available proxy ($/yr)','Debt service ($/yr)','Coverage proxy','Threshold','Headroom','Classification','Scenario'],...filtered.map(l=>[l.id,l.name,l.sector,l.exposure,l.cash,l.debt,l.coverage.toFixed(4),min.toFixed(2),l.headroom.toFixed(4),l.flag,scenario.label])];
 $('monitor-download').disabled=!total;
 memo=['COMMERCIAL CREDIT PORTFOLIO SCREEN — FICTIONAL','Scenario: '+scenario.label,'Illustrative minimum: '+ratio(min),'Facilities in view: '+total,'Fictional exposure: '+money(exposure),'Below-threshold count: '+counts.Breach,'Watch-range count: '+counts.Watch,'Above-range count: '+counts.Healthy,'Documentation action: Verify source financials, debt schedules, covenant definitions and permitted adjustments. Refer potential exceptions to authorized credit staff.','This is not a real covenant determination or default forecast.'].join('\n');
}
for(const id of ['monitor-scenario','monitor-threshold','monitor-sector','monitor-status'])$(id).addEventListener('change',refresh);
$('monitor-download').addEventListener('click',()=>csv(latest));$('monitor-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(memo);$('monitor-copy').textContent='Summary copied ✓';setTimeout(()=>$('monitor-copy').textContent='Copy monitoring memo ↗',1600)}catch(e){$('monitor-copy').textContent='Clipboard unavailable'}});refresh();
})();
