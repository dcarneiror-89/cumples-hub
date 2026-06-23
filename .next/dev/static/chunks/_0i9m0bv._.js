(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://xunmfmfipxvsqeeyxsjg.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_Gdr-NnlplJ5s6mOrjAnL-g_4M6_AOJo");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createPersona",
    ()=>createPersona,
    "deleteFoto",
    ()=>deleteFoto,
    "deletePersona",
    ()=>deletePersona,
    "getAportes",
    ()=>getAportes,
    "getPersonas",
    ()=>getPersonas,
    "marcarTodoPagado",
    ()=>marcarTodoPagado,
    "toggleAporte",
    ()=>toggleAporte,
    "updateFotoUrl",
    ()=>updateFotoUrl,
    "updatePersona",
    ()=>updatePersona,
    "uploadFoto",
    ()=>uploadFoto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
async function getPersonas() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('personas').select('*, regalo_ideas(id, descripcion, enlace, orden)').order('mes', {
        ascending: true
    }).order('dia', {
        ascending: true
    });
    if (error) throw error;
    return (data ?? []).map((p)=>({
            ...p,
            regalo_ideas: (p.regalo_ideas ?? []).sort((a, b)=>(a.orden ?? 0) - (b.orden ?? 0))
        }));
}
async function createPersona(input) {
    const { regalo_ideas, ...personaData } = input;
    const { data: persona, error: pErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('personas').insert(personaData).select().single();
    if (pErr) throw pErr;
    if (regalo_ideas.length > 0) {
        await saveRegaloIdeas(persona.id, regalo_ideas);
    }
    return {
        ...persona,
        regalo_ideas
    };
}
async function updatePersona(id, input) {
    const { regalo_ideas, ...personaData } = input;
    const { error: pErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('personas').update(personaData).eq('id', id);
    if (pErr) throw pErr;
    // Borra las ideas antiguas y vuelve a insertar
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('regalo_ideas').delete().eq('persona_id', id);
    if (regalo_ideas.length > 0) {
        await saveRegaloIdeas(id, regalo_ideas);
    }
}
async function deletePersona(id) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('personas').delete().eq('id', id);
    if (error) throw error;
}
async function saveRegaloIdeas(personaId, ideas) {
    const rows = ideas.map((idea, i)=>({
            persona_id: personaId,
            descripcion: idea.descripcion,
            enlace: idea.enlace,
            orden: i
        }));
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('regalo_ideas').insert(rows);
    if (error) throw error;
}
async function getAportes() {
    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('aportes').select('aportante_id, cumpleanero_id, pagado');
    if (error) throw error;
    const map = {};
    for (const row of data ?? []){
        if (!map[row.cumpleanero_id]) map[row.cumpleanero_id] = {};
        map[row.cumpleanero_id][row.aportante_id] = row.pagado;
    }
    return map;
}
async function toggleAporte(cumpleaneroId, aportanteId, pagado) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('aportes').upsert({
        cumpleanero_id: cumpleaneroId,
        aportante_id: aportanteId,
        pagado
    }, {
        onConflict: 'aportante_id,cumpleanero_id'
    });
    if (error) throw error;
}
async function marcarTodoPagado(cumpleaneroId) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('aportes').update({
        pagado: true
    }).eq('cumpleanero_id', cumpleaneroId);
    if (error) throw error;
}
async function uploadFoto(personaId, file) {
    const ext = file.name.split('.').pop();
    const path = `${personaId}.${ext}`;
    const { error: upErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('fotos-perfil').upload(path, file, {
        upsert: true
    });
    if (upErr) throw upErr;
    const { data } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('fotos-perfil').getPublicUrl(path);
    // Agrega un timestamp para forzar cache-bust en el navegador
    return `${data.publicUrl}?t=${Date.now()}`;
}
async function updateFotoUrl(id, foto_url) {
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('personas').update({
        foto_url
    }).eq('id', id);
    if (error) throw error;
}
async function deleteFoto(personaId) {
    // Intenta borrar .jpg, .png, .webp (sin importar extensión)
    const extensions = [
        'jpg',
        'jpeg',
        'png',
        'webp',
        'gif'
    ];
    await Promise.allSettled(extensions.map((ext)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('fotos-perfil').remove([
            `${personaId}.${ext}`
        ])));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/BirthdayApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BirthdayApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// ─── ICONOS SVG ───────────────────────────────────────────────
const IconCake = ({ className = 'w-6 h-6' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-4v4m3-4v2M9 12h.01M12 12h.01M15 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 9,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 8,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = IconCake;
const IconGift = ({ className = 'w-6 h-6' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 14,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 13,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = IconGift;
const IconCheck = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 3,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 13l4 4L19 7"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 19,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 18,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = IconCheck;
const IconChevronLeft = ({ className = 'w-6 h-6' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M15 19l-7-7 7-7"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 24,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 23,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = IconChevronLeft;
const IconChevronRight = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 5l7 7-7 7"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 29,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c4 = IconChevronRight;
const IconSparkles = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 34,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 33,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c5 = IconSparkles;
const IconParty = ({ className = 'w-6 h-6' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 39,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 38,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c6 = IconParty;
const IconLink = ({ className = 'w-4 h-4' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 44,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 43,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c7 = IconLink;
const IconSearch = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 49,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 48,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c8 = IconSearch;
const IconDatabase = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 54,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 53,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c9 = IconDatabase;
const IconEdit = ({ className = 'w-4 h-4' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 59,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 58,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c10 = IconEdit;
const IconUserAdd = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c11 = IconUserAdd;
const IconTrash = ({ className = 'w-4 h-4' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 69,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c12 = IconTrash;
const IconCamera = ({ className = 'w-5 h-5' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            }, void 0, false, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 74,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            }, void 0, false, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 75,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 73,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c13 = IconCamera;
// ─── CONSTANTES ───────────────────────────────────────────────
const PRESET_COLORS = [
    {
        name: 'Azulito',
        value: 'from-blue-400 to-indigo-500'
    },
    {
        name: 'Amarillo',
        value: 'from-yellow-400 to-amber-500'
    },
    {
        name: 'Rojo',
        value: 'from-red-400 to-rose-600'
    },
    {
        name: 'Verde',
        value: 'from-emerald-400 to-teal-500'
    },
    {
        name: 'Rosa',
        value: 'from-pink-400 to-rose-500'
    },
    {
        name: 'Violeta',
        value: 'from-purple-400 to-violet-500'
    },
    {
        name: 'Naranja',
        value: 'from-orange-400 to-amber-500'
    },
    {
        name: 'Cyan',
        value: 'from-cyan-400 to-blue-500'
    }
];
const MONTH_NAMES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];
function getZodiacInfo(day, month) {
    const d = day, m = month;
    if (m === 3 && d >= 21 || m === 4 && d <= 19) return {
        sign: 'Aries',
        emoji: '♈'
    };
    if (m === 4 && d >= 20 || m === 5 && d <= 20) return {
        sign: 'Tauro',
        emoji: '♉'
    };
    if (m === 5 && d >= 21 || m === 6 && d <= 20) return {
        sign: 'Géminis',
        emoji: '♊'
    };
    if (m === 6 && d >= 21 || m === 7 && d <= 22) return {
        sign: 'Cáncer',
        emoji: '♋'
    };
    if (m === 7 && d >= 23 || m === 8 && d <= 22) return {
        sign: 'Leo',
        emoji: '♌'
    };
    if (m === 8 && d >= 23 || m === 9 && d <= 22) return {
        sign: 'Virgo',
        emoji: '♍'
    };
    if (m === 9 && d >= 23 || m === 10 && d <= 22) return {
        sign: 'Libra',
        emoji: '♎'
    };
    if (m === 10 && d >= 23 || m === 11 && d <= 21) return {
        sign: 'Escorpio',
        emoji: '♏'
    };
    if (m === 11 && d >= 22 || m === 12 && d <= 21) return {
        sign: 'Sagitario',
        emoji: '♐'
    };
    if (m === 12 && d >= 22 || m === 1 && d <= 19) return {
        sign: 'Capricornio',
        emoji: '♑'
    };
    if (m === 1 && d >= 20 || m === 2 && d <= 18) return {
        sign: 'Acuario',
        emoji: '♒'
    };
    return {
        sign: 'Piscis',
        emoji: '♓'
    };
}
function BirthdayApp() {
    _s();
    const CURRENT_MONTH = new Date().getMonth() + 1;
    const [team, setTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [payments, setPayments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('home');
    const [selectedPersonId, setSelectedPersonId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('dark');
    const [showConfettiSplash, setShowConfettiSplash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [celebratedId, setCelebratedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('todos');
    // Formulario
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingPersonId, setEditingPersonId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formName, setFormName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formDay, setFormDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [formMonth, setFormMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date().getMonth() + 1);
    const [formSign, setFormSign] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Géminis');
    const [formEmoji, setFormEmoji] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('♊');
    const [formColor, setFormColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('from-blue-400 to-indigo-500');
    const [formPhone, setFormPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formGiftText1, setFormGiftText1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formGiftLink1, setFormGiftLink1] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formGiftText2, setFormGiftText2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formGiftLink2, setFormGiftLink2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formGiftText3, setFormGiftText3] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [formGiftLink3, setFormGiftLink3] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Foto: File para subir, string para preview (URL o base64)
    const [formPhotoFile, setFormPhotoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formPhotoPreview, setFormPhotoPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formPhotoRemoved, setFormPhotoRemoved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchAdminQuery, setSearchAdminQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [adminNotification, setAdminNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [personToDelete, setPersonToDelete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formExpanded, setFormExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Cargar datos al montar ──────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayApp.useEffect": ()=>{
            loadData();
        }
    }["BirthdayApp.useEffect"], []);
    const loadData = async ()=>{
        setIsLoading(true);
        try {
            const [personas, aportes] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPersonas"](),
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAportes"]()
            ]);
            setTeam(personas);
            setPayments(aportes);
        } catch (e) {
            console.error(e);
            showNotification('Error al cargar datos de Supabase', 'error');
        } finally{
            setIsLoading(false);
        }
    };
    // Recalcular signo al cambiar día/mes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BirthdayApp.useEffect": ()=>{
            const z = getZodiacInfo(formDay, formMonth);
            setFormSign(z.sign);
            setFormEmoji(z.emoji);
        }
    }["BirthdayApp.useEffect"], [
        formDay,
        formMonth
    ]);
    // ── Helpers ────────────────────────────────────────────────
    const playSoundEffect = (type)=>{
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (!AC) return;
            const ctx = new AC();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            if (type === 'tap') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(280, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);
                gain.gain.setValueAtTime(0.04, ctx.currentTime);
                osc.start();
                osc.stop(ctx.currentTime + 0.08);
            } else {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(330, ctx.currentTime);
                osc.frequency.setValueAtTime(392, ctx.currentTime + 0.1);
                osc.frequency.setValueAtTime(523, ctx.currentTime + 0.2);
                osc.frequency.setValueAtTime(659, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                osc.start();
                osc.stop(ctx.currentTime + 0.45);
            }
        } catch  {}
    };
    const handleCopyLink = (url)=>{
        try {
            const el = document.createElement('input');
            document.body.appendChild(el);
            el.value = url;
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            showNotification('¡Enlace copiado!', 'success');
        } catch  {
            showNotification('Error al copiar enlace', 'error');
        }
    };
    const showNotification = (msg, type)=>{
        setAdminNotification({
            msg,
            type
        });
        setTimeout(()=>setAdminNotification(null), 4000);
    };
    const getPaidCount = (personId)=>Object.values(payments[personId] ?? {}).filter(Boolean).length;
    const isFullyPaid = (personId)=>getPaidCount(personId) === team.length - 1;
    const triggerCelebration = (id)=>{
        playSoundEffect('complete');
        setCelebratedId(id);
        setShowConfettiSplash(true);
        setTimeout(()=>{
            setCelebratedId(null);
            setShowConfettiSplash(false);
        }, 2800);
    };
    // ── Toggle de aporte (optimistic update) ───────────────────
    const handleTogglePayment = async (targetId, contributorId)=>{
        const currentStatus = payments[targetId]?.[contributorId] ?? false;
        const newStatus = !currentStatus;
        playSoundEffect('tap');
        // Optimistic update
        const updatedForTarget = {
            ...payments[targetId],
            [contributorId]: newStatus
        };
        setPayments((prev)=>({
                ...prev,
                [targetId]: updatedForTarget
            }));
        const fullyPaidNow = Object.values(updatedForTarget).filter(Boolean).length === team.length - 1;
        if (fullyPaidNow && !currentStatus) {
            setTimeout(()=>triggerCelebration(targetId), 350);
        }
        // Persist
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleAporte"](targetId, contributorId, newStatus);
        } catch  {
            // Revertir en caso de error
            setPayments((prev)=>({
                    ...prev,
                    [targetId]: {
                        ...prev[targetId],
                        [contributorId]: currentStatus
                    }
                }));
            showNotification('Error al guardar aporte', 'error');
        }
    };
    // ── Completar vaca (marcar todos como pagados) ──────────────
    const handleCompletarVaca = async (personId)=>{
        const fullyPaid = {};
        team.forEach((t)=>{
            if (t.id !== personId) fullyPaid[t.id] = true;
        });
        setPayments((prev)=>({
                ...prev,
                [personId]: fullyPaid
            }));
        triggerCelebration(personId);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marcarTodoPagado"](personId);
        } catch  {
            showNotification('Error al guardar cambios', 'error');
            await loadData(); // recargar estado real
        }
    };
    // ── Foto handlers ───────────────────────────────────────────
    const handlePhotoSelect = async (file)=>{
        setFormPhotoFile(file);
        setFormPhotoRemoved(false);
        const reader = new FileReader();
        reader.onloadend = ()=>setFormPhotoPreview(reader.result);
        reader.readAsDataURL(file);
        // Auto-guardar foto si estamos editando una persona existente
        if (isEditing && editingPersonId !== null) {
            try {
                const foto_url = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadFoto"](editingPersonId, file);
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateFotoUrl"](editingPersonId, foto_url);
                setTeam((prev)=>prev.map((p)=>p.id === editingPersonId ? {
                            ...p,
                            foto_url
                        } : p));
                showNotification('¡Foto guardada!', 'success');
            } catch  {
                showNotification('Error al guardar foto', 'error');
            }
        }
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = ()=>setIsDragging(false);
    const handleDrop = (e)=>{
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file?.type.startsWith('image/')) {
            handlePhotoSelect(file);
        } else {
            showNotification('Arrastra un archivo de imagen válido', 'error');
        }
    };
    // ── Guardar persona ────────────────────────────────────────
    const handleSavePerson = async (e)=>{
        e.preventDefault();
        if (!formName.trim()) {
            showNotification('Ingresa un nombre', 'error');
            return;
        }
        playSoundEffect('tap');
        setIsSaving(true);
        const gifts = [
            {
                descripcion: formGiftText1.trim(),
                enlace: formGiftLink1.trim()
            },
            {
                descripcion: formGiftText2.trim(),
                enlace: formGiftLink2.trim()
            },
            {
                descripcion: formGiftText3.trim(),
                enlace: formGiftLink3.trim()
            }
        ].filter((g)=>g.descripcion || g.enlace);
        try {
            if (isEditing && editingPersonId !== null) {
                // Subir foto si hay una nueva, o eliminar si se removió
                let foto_url = team.find((p)=>p.id === editingPersonId)?.foto_url ?? null;
                if (formPhotoRemoved) {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFoto"](editingPersonId);
                    foto_url = null;
                } else if (formPhotoFile) {
                    foto_url = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadFoto"](editingPersonId, formPhotoFile);
                }
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePersona"](editingPersonId, {
                    nombre: formName.trim(),
                    dia: formDay,
                    mes: formMonth,
                    signo: formSign,
                    emoji_signo: formEmoji,
                    color: formColor,
                    foto_url,
                    telefono: formPhone.trim() || null,
                    regalo_ideas: gifts
                });
                showNotification(`${formName} actualizado`, 'success');
            } else {
                // Crear persona primero para obtener el id
                const newPersona = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPersona"]({
                    nombre: formName.trim(),
                    dia: formDay,
                    mes: formMonth,
                    signo: formSign,
                    emoji_signo: formEmoji,
                    color: formColor,
                    foto_url: null,
                    telefono: formPhone.trim() || null,
                    regalo_ideas: gifts
                });
                // Subir foto si hay una
                if (formPhotoFile) {
                    const foto_url = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadFoto"](newPersona.id, formPhotoFile);
                    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePersona"](newPersona.id, {
                        nombre: newPersona.nombre,
                        dia: newPersona.dia,
                        mes: newPersona.mes,
                        signo: newPersona.signo,
                        emoji_signo: newPersona.emoji_signo,
                        color: newPersona.color,
                        foto_url,
                        telefono: newPersona.telefono,
                        regalo_ideas: gifts
                    });
                }
                showNotification(`¡${formName} agregado!`, 'success');
            }
            await loadData();
            resetForm();
        } catch (err) {
            console.error(err);
            showNotification('Error al guardar', 'error');
        } finally{
            setIsSaving(false);
        }
    };
    const handleStartEdit = (person)=>{
        playSoundEffect('tap');
        setIsEditing(true);
        setEditingPersonId(person.id);
        setFormName(person.nombre);
        setFormDay(person.dia);
        setFormMonth(person.mes);
        setFormSign(person.signo);
        setFormEmoji(person.emoji_signo);
        setFormColor(person.color);
        setFormPhone(person.telefono ?? '');
        setFormPhotoFile(null);
        setFormPhotoPreview(person.foto_url ?? null);
        setFormGiftText1(person.regalo_ideas[0]?.descripcion ?? '');
        setFormGiftLink1(person.regalo_ideas[0]?.enlace ?? '');
        setFormGiftText2(person.regalo_ideas[1]?.descripcion ?? '');
        setFormGiftLink2(person.regalo_ideas[1]?.enlace ?? '');
        setFormGiftText3(person.regalo_ideas[2]?.descripcion ?? '');
        setFormGiftLink3(person.regalo_ideas[2]?.enlace ?? '');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    const confirmDeletePerson = async ()=>{
        if (!personToDelete) return;
        const { id, nombre } = personToDelete;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePersona"](id);
            if (editingPersonId === id) resetForm();
            setPersonToDelete(null);
            showNotification(`${nombre} eliminado`, 'info');
            await loadData();
        } catch  {
            showNotification('Error al eliminar', 'error');
        }
    };
    const resetForm = ()=>{
        setIsEditing(false);
        setEditingPersonId(null);
        setFormName('');
        setFormDay(1);
        setFormMonth(new Date().getMonth() + 1);
        setFormColor('from-blue-400 to-indigo-500');
        setFormPhone('');
        setFormGiftText1('');
        setFormGiftLink1('');
        setFormGiftText2('');
        setFormGiftLink2('');
        setFormGiftText3('');
        setFormGiftLink3('');
        setFormPhotoFile(null);
        setFormPhotoPreview(null);
        setFormPhotoRemoved(false);
        setIsDragging(false);
        setFormExpanded(false);
    };
    // ── Memos ──────────────────────────────────────────────────
    const globalStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthdayApp.useMemo[globalStats]": ()=>{
            const hoy = new Date();
            const mesHoy = hoy.getMonth() + 1;
            const diaHoy = hoy.getDate();
            const cumpleYaPaso = {
                "BirthdayApp.useMemo[globalStats].cumpleYaPaso": (mes, dia)=>mes < mesHoy || mes === mesHoy && dia <= diaHoy
            }["BirthdayApp.useMemo[globalStats].cumpleYaPaso"];
            let cumplesPasados = 0, cumplesPorVenir = 0;
            let pagosPendientesEnPasados = 0;
            team.forEach({
                "BirthdayApp.useMemo[globalStats]": (p)=>{
                    const paso = cumpleYaPaso(p.mes, p.dia);
                    if (paso) {
                        cumplesPasados++;
                        const pendientesDeEste = team.length - 1 - getPaidCount(p.id);
                        pagosPendientesEnPasados += pendientesDeEste;
                    } else {
                        cumplesPorVenir++;
                    }
                }
            }["BirthdayApp.useMemo[globalStats]"]);
            return {
                cumplesPasados,
                cumplesPorVenir,
                pagosPendientesEnPasados
            };
        }
    }["BirthdayApp.useMemo[globalStats]"], [
        team,
        payments
    ]);
    const currentMonthBirthdays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthdayApp.useMemo[currentMonthBirthdays]": ()=>team.filter({
                "BirthdayApp.useMemo[currentMonthBirthdays]": (p)=>p.mes === CURRENT_MONTH
            }["BirthdayApp.useMemo[currentMonthBirthdays]"]).sort({
                "BirthdayApp.useMemo[currentMonthBirthdays]": (a, b)=>a.dia - b.dia
            }["BirthdayApp.useMemo[currentMonthBirthdays]"])
    }["BirthdayApp.useMemo[currentMonthBirthdays]"], [
        team,
        CURRENT_MONTH
    ]);
    const filteredTeam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthdayApp.useMemo[filteredTeam]": ()=>team.filter({
                "BirthdayApp.useMemo[filteredTeam]": (p)=>{
                    const match = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
                    if (statusFilter === 'completados') return match && isFullyPaid(p.id);
                    if (statusFilter === 'pendientes') return match && !isFullyPaid(p.id);
                    return match;
                }
            }["BirthdayApp.useMemo[filteredTeam]"])
    }["BirthdayApp.useMemo[filteredTeam]"], [
        team,
        payments,
        searchQuery,
        statusFilter
    ]);
    const filteredAdminTeam = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BirthdayApp.useMemo[filteredAdminTeam]": ()=>team.filter({
                "BirthdayApp.useMemo[filteredAdminTeam]": (p)=>p.nombre.toLowerCase().includes(searchAdminQuery.toLowerCase())
            }["BirthdayApp.useMemo[filteredAdminTeam]"])
    }["BirthdayApp.useMemo[filteredAdminTeam]"], [
        team,
        searchAdminQuery
    ]);
    // ── Loading screen ─────────────────────────────────────────
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-slate-950 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl animate-bounce",
                        children: "🎂"
                    }, void 0, false, {
                        fileName: "[project]/components/BirthdayApp.tsx",
                        lineNumber: 490,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-slate-400 font-bold text-sm",
                        children: "Cargando cumpleaños..."
                    }, void 0, false, {
                        fileName: "[project]/components/BirthdayApp.tsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 489,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/BirthdayApp.tsx",
            lineNumber: 488,
            columnNumber: 7
        }, this);
    }
    // ── RENDER ─────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `min-h-screen font-sans antialiased selection:bg-rose-500 selection:text-white transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} flex flex-col md:flex-row`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `hidden md:flex md:w-72 shrink-0 md:border-r flex-col z-30 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 flex items-center justify-between border-b border-slate-800/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2.5 rounded-2xl bg-rose-500/10 text-rose-500",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCake, {
                                            className: "w-6 h-6 animate-bounce"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 510,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/BirthdayApp.tsx",
                                        lineNumber: 509,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `font-black text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`,
                                                children: "Cumples"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 513,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[10px] text-slate-400 font-bold uppercase tracking-wider",
                                                children: "del Mejor HUB!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 514,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BirthdayApp.tsx",
                                        lineNumber: 512,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BirthdayApp.tsx",
                                lineNumber: 508,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    playSoundEffect('tap');
                                    setTheme((t)=>t === 'dark' ? 'light' : 'dark');
                                },
                                className: `p-2 rounded-xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-slate-600'}`,
                                children: theme === 'dark' ? '☀️' : '🌙'
                            }, void 0, false, {
                                fileName: "[project]/components/BirthdayApp.tsx",
                                lineNumber: 517,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BirthdayApp.tsx",
                        lineNumber: 507,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "p-4 space-y-2",
                        children: [
                            'home',
                            'regalos',
                            'planilla'
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    playSoundEffect('tap');
                                    setActiveTab(tab);
                                    setSelectedPersonId(null);
                                },
                                className: `w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`,
                                children: [
                                    tab === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCake, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 529,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Inicio & Festejos"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 529,
                                                columnNumber: 69
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    tab === 'regalos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconGift, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 530,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Gestión de Regalos"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 530,
                                                columnNumber: 69
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400",
                                                children: team.length
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 530,
                                                columnNumber: 100
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    tab === 'planilla' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconDatabase, {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 531,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Gestionar Planilla"
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 531,
                                                columnNumber: 73
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, tab, true, {
                                fileName: "[project]/components/BirthdayApp.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/BirthdayApp.tsx",
                        lineNumber: 523,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 504,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: `fixed bottom-0 left-0 right-0 md:hidden z-40 border-t ${theme === 'dark' ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-md`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-stretch h-16",
                    children: [
                        'home',
                        'regalos',
                        'planilla'
                    ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                playSoundEffect('tap');
                                setActiveTab(tab);
                                setSelectedPersonId(null);
                            },
                            className: `flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all ${activeTab === tab ? 'text-rose-500' : 'text-slate-500'}`,
                            children: [
                                tab === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCake, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 547,
                                            columnNumber: 38
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Inicio"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 547,
                                            columnNumber: 69
                                        }, this)
                                    ]
                                }, void 0, true),
                                tab === 'regalos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconGift, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 548,
                                            columnNumber: 38
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Regalos"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 548,
                                            columnNumber: 69
                                        }, this)
                                    ]
                                }, void 0, true),
                                tab === 'planilla' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconDatabase, {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 549,
                                            columnNumber: 38
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Planilla"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 549,
                                            columnNumber: 73
                                        }, this)
                                    ]
                                }, void 0, true),
                                activeTab === tab && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute bottom-1 w-1 h-1 rounded-full bg-rose-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 550,
                                    columnNumber: 35
                                }, this)
                            ]
                        }, tab, true, {
                            fileName: "[project]/components/BirthdayApp.tsx",
                            lineNumber: 543,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/BirthdayApp.tsx",
                    lineNumber: 541,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col min-h-screen overflow-y-auto pb-16 md:pb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: `px-6 lg:px-8 py-5 border-b flex items-center justify-between backdrop-blur-md z-20 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white/80'}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: selectedPersonId !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        playSoundEffect('tap');
                                        setSelectedPersonId(null);
                                    },
                                    className: "flex items-center gap-2 text-sm font-bold text-rose-500 bg-rose-500/10 px-4 py-2 rounded-xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevronLeft, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 565,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Volver a la Lista"
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 565,
                                            columnNumber: 56
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 563,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-black",
                                    children: [
                                        activeTab === 'home' && 'Cumpleaños HUB',
                                        activeTab === 'regalos' && 'Centro de Regalos Colectivos',
                                        activeTab === 'planilla' && 'Base de Datos del Equipo'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 568,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/BirthdayApp.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-400",
                                children: [
                                    "Mes actual: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-rose-500 font-extrabold",
                                        children: MONTH_NAMES[CURRENT_MONTH - 1]
                                    }, void 0, false, {
                                        fileName: "[project]/components/BirthdayApp.tsx",
                                        lineNumber: 576,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BirthdayApp.tsx",
                                lineNumber: 575,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/BirthdayApp.tsx",
                        lineNumber: 558,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 lg:p-8 flex-1",
                        children: selectedPersonId !== null ? (()=>{
                            const person = team.find((p)=>p.id === selectedPersonId);
                            const paidCount = getPaidCount(person.id);
                            const isFinished = isFullyPaid(person.id);
                            const percent = Math.round(paidCount / Math.max(team.length - 1, 1) * 100);
                            const validGifts = person.regalo_ideas.filter((g)=>g.descripcion || g.enlace);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-5 space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-20 h-20 rounded-2xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white font-extrabold text-2xl shadow-md overflow-hidden shrink-0`,
                                                                children: person.foto_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: person.foto_url,
                                                                    className: "w-full h-full object-cover",
                                                                    alt: person.nombre
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 597,
                                                                    columnNumber: 29
                                                                }, this) : person.nombre.charAt(0)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 595,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs uppercase tracking-wider text-rose-500 font-extrabold",
                                                                        children: "Fondo Colectivo"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 601,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                                        className: "text-2xl font-black",
                                                                        children: person.nombre
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 602,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-slate-400 font-bold",
                                                                        children: [
                                                                            "📅 ",
                                                                            person.dia,
                                                                            " de ",
                                                                            MONTH_NAMES[person.mes - 1],
                                                                            " | ",
                                                                            person.emoji_signo,
                                                                            " ",
                                                                            person.signo,
                                                                            person.telefono && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "ml-2",
                                                                                children: [
                                                                                    "📱 ",
                                                                                    person.telefono
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 605,
                                                                                columnNumber: 47
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 603,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 600,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-6 pt-6 border-t border-slate-800/10 space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-between items-center text-sm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-slate-400",
                                                                        children: "Recaudación:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 611,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `font-black text-lg ${isFinished ? 'text-emerald-500' : 'text-rose-500'}`,
                                                                        children: [
                                                                            paidCount,
                                                                            "/",
                                                                            team.length - 1,
                                                                            " (",
                                                                            percent,
                                                                            "%)"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 612,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 610,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full h-3 bg-slate-800/30 rounded-full overflow-hidden",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `h-full rounded-full bg-gradient-to-r transition-all duration-500 ${isFinished ? 'from-emerald-400 to-green-500' : 'from-rose-400 to-indigo-500'}`,
                                                                    style: {
                                                                        width: `${percent}%`
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 617,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 616,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 593,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-xs font-black uppercase tracking-widest text-slate-400",
                                                        children: "Regalos Registrados 🎁"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                        lineNumber: 624,
                                                        columnNumber: 21
                                                    }, this),
                                                    validGifts.length > 0 ? validGifts.map((g, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-4 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100 shadow-md'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-extrabold text-rose-500 bg-rose-500/10 w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                                        children: i + 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 628,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1 overflow-hidden space-y-3",
                                                                        children: [
                                                                            g.descripcion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-semibold whitespace-pre-line break-words text-slate-300",
                                                                                children: g.descripcion
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 630,
                                                                                columnNumber: 47
                                                                            }, this),
                                                                            g.enlace && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "pt-2 border-t border-slate-800/40 flex flex-col gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconLink, {
                                                                                                className: "w-3.5 h-3.5"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 633,
                                                                                                columnNumber: 121
                                                                                            }, this),
                                                                                            "Enlace:"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 633,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                                href: g.enlace,
                                                                                                target: "_blank",
                                                                                                rel: "noopener noreferrer",
                                                                                                className: "flex-1 text-xs text-blue-400 hover:text-blue-300 underline truncate bg-slate-950/40 p-2 rounded-xl border border-slate-850",
                                                                                                children: g.enlace
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 635,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                onClick: ()=>handleCopyLink(g.enlace),
                                                                                                className: "px-3 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl text-xs font-bold border border-rose-500/20",
                                                                                                children: "Copiar"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 639,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 634,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 632,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 629,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 627,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, i, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 626,
                                                            columnNumber: 23
                                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-6 text-center rounded-2xl border border-dashed border-slate-800",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-slate-400 italic",
                                                            children: "Sin ideas de regalo cargadas."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 651,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 623,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BirthdayApp.tsx",
                                        lineNumber: 592,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-7",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-6 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-5 pb-4 border-b border-slate-800/30",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-base font-black",
                                                                    children: [
                                                                        "Aportantes (",
                                                                        team.length - 1 - paidCount,
                                                                        " pendientes)"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 661,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-slate-400 mt-1",
                                                                    children: "Haz clic para marcar/desmarcar."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 662,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 660,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleCompletarVaca(person.id),
                                                            className: "py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs uppercase shadow-lg flex items-center gap-2 active:scale-95 transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSparkles, {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Completar Vaca"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 60
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 664,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1",
                                                    children: team.filter((t)=>t.id !== person.id).map((contributor)=>{
                                                        const hasPaid = payments[person.id]?.[contributor.id] ?? false;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>handleTogglePayment(person.id, contributor.id),
                                                            className: `p-3 rounded-2xl flex items-center justify-between border cursor-pointer transition-all active:scale-98 ${hasPaid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-slate-900/20 border-slate-800'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-9 h-9 rounded-xl bg-gradient-to-tr ${contributor.color} flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden`,
                                                                            children: contributor.foto_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: contributor.foto_url,
                                                                                className: "w-full h-full object-cover",
                                                                                alt: ""
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 680,
                                                                                columnNumber: 37
                                                                            }, this) : contributor.nombre.charAt(0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 678,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-sm font-semibold truncate max-w-[100px]",
                                                                            children: contributor.nombre
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 683,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 677,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2.5 py-1.5 rounded-xl text-[10px] font-black ${hasPaid ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-400'}`,
                                                                    children: hasPaid ? 'PAGÓ' : 'FALTA'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 685,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, contributor.id, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 673,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 658,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/BirthdayApp.tsx",
                                        lineNumber: 657,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/BirthdayApp.tsx",
                                lineNumber: 591,
                                columnNumber: 15
                            }, this);
                        })() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                activeTab === 'home' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 xl:grid-cols-12 gap-8 items-start animate-fadeIn",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "xl:col-span-8 space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-3xl font-black",
                                                            children: [
                                                                "¡Este mes celebramos ",
                                                                currentMonthBirthdays.length,
                                                                " cumpleaños!"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 703,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-indigo-100 mt-2",
                                                            children: "Gestiona el fondo colectivo y descubre los regalos del equipo."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-xs font-black uppercase text-slate-400 tracking-widest",
                                                            children: [
                                                                "Cumpleañeros de ",
                                                                MONTH_NAMES[CURRENT_MONTH - 1],
                                                                " 🎉"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 707,
                                                            columnNumber: 23
                                                        }, this),
                                                        currentMonthBirthdays.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-slate-400 italic",
                                                            children: "Sin cumpleaños este mes."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                                            children: currentMonthBirthdays.map((person)=>{
                                                                const paidCount = getPaidCount(person.id);
                                                                const totalPaid = isFullyPaid(person.id);
                                                                const primaryGift = person.regalo_ideas[0]?.descripcion || 'Sorpresa ✨';
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `relative rounded-3xl border p-6 transition-all ${celebratedId === person.id ? 'scale-102 ring-2 ring-rose-500' : 'bg-slate-900 border-slate-800'}`,
                                                                    children: [
                                                                        totalPaid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "absolute top-4 right-4 bg-emerald-500 text-white font-black text-[9px] px-2.5 py-1 rounded-full",
                                                                            children: "COMPRADO ✅"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 718,
                                                                            columnNumber: 45
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: `w-14 h-16 rounded-2xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white text-2xl font-extrabold shadow-md overflow-hidden shrink-0`,
                                                                                    children: person.foto_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: person.foto_url,
                                                                                        className: "w-full h-full object-cover",
                                                                                        alt: ""
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 721,
                                                                                        columnNumber: 54
                                                                                    }, this) : person.nombre.charAt(0)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 720,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1 space-y-1 overflow-hidden",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                            className: "font-black text-lg truncate",
                                                                                            children: [
                                                                                                person.nombre,
                                                                                                " ",
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    children: person.emoji_signo
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                    lineNumber: 724,
                                                                                                    columnNumber: 95
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 724,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                            className: "text-xs text-rose-400 font-bold",
                                                                                            children: [
                                                                                                "📅 ",
                                                                                                person.dia,
                                                                                                " de ",
                                                                                                MONTH_NAMES[person.mes - 1],
                                                                                                " | ",
                                                                                                person.signo
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 725,
                                                                                            columnNumber: 35
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "mt-3 p-3 rounded-2xl bg-slate-950/60",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "block text-[8px] font-bold text-slate-400 uppercase mb-1",
                                                                                                    children: "Regalo Principal:"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                    lineNumber: 727,
                                                                                                    columnNumber: 37
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs font-semibold truncate block",
                                                                                                    children: [
                                                                                                        "🎁 ",
                                                                                                        primaryGift
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                    lineNumber: 728,
                                                                                                    columnNumber: 37
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 726,
                                                                                            columnNumber: 35
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 723,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 719,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "mt-4 pt-4 border-t border-slate-800/40 flex items-center justify-between gap-4",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "h-full bg-rose-500",
                                                                                        style: {
                                                                                            width: `${paidCount / Math.max(team.length - 1, 1) * 100}%`
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 734,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 733,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex gap-2",
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>setSelectedPersonId(person.id),
                                                                                        className: "px-3 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-[11px]",
                                                                                        children: "Ver persona"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 737,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 736,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 732,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, person.id, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 717,
                                                                    columnNumber: 29
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 711,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 706,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 701,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "xl:col-span-4 space-y-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-5 rounded-3xl border bg-slate-900 border-slate-800 space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xs font-black uppercase text-slate-400",
                                                            children: "Resumen del Año 📊"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 748,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-2xl",
                                                                    children: "✅"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 752,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-black uppercase text-emerald-400 block",
                                                                            children: "Ya celebrados"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 754,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl font-black text-emerald-400",
                                                                            children: [
                                                                                globalStats.cumplesPasados,
                                                                                " cumpleaños"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 755,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 753,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 751,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-2xl",
                                                                    children: "🎂"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 761,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-black uppercase text-indigo-400 block",
                                                                            children: "Por celebrar"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 763,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xl font-black text-indigo-400",
                                                                            children: [
                                                                                globalStats.cumplesPorVenir,
                                                                                " cumpleaños"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 764,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 762,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 760,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `p-3.5 rounded-2xl border flex items-center gap-3 ${globalStats.pagosPendientesEnPasados === 0 ? 'bg-slate-800/40 border-slate-700' : 'bg-rose-500/10 border-rose-500/20'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-2xl",
                                                                    children: globalStats.pagosPendientesEnPasados === 0 ? '💸' : '⏳'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 774,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `text-[10px] font-black uppercase block ${globalStats.pagosPendientesEnPasados === 0 ? 'text-slate-400' : 'text-rose-400'}`,
                                                                            children: "Aportes por cobrar"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 776,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `text-xl font-black ${globalStats.pagosPendientesEnPasados === 0 ? 'text-slate-300' : 'text-rose-400'}`,
                                                                            children: globalStats.pagosPendientesEnPasados === 0 ? '¡Todo al día!' : `${globalStats.pagosPendientesEnPasados} pagos`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 779,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        globalStats.pagosPendientesEnPasados > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-rose-400/70 block",
                                                                            children: "de cumpleaños ya pasados"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 783,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 775,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 769,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 747,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xs font-black uppercase text-slate-400",
                                                            children: "Próximos Cumpleaños ⏳"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 23
                                                        }, this),
                                                        team.filter((p)=>p.mes !== CURRENT_MONTH).slice(0, 5).map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: ()=>setSelectedPersonId(p.id),
                                                                className: "p-3 rounded-2xl flex items-center justify-between border bg-slate-900/50 hover:bg-slate-900 border-slate-800 cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `w-9 h-9 rounded-xl bg-gradient-to-tr ${p.color} flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden`,
                                                                                children: p.foto_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                    src: p.foto_url,
                                                                                    className: "w-full h-full object-cover",
                                                                                    alt: ""
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 795,
                                                                                    columnNumber: 45
                                                                                }, this) : p.nombre.charAt(0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 794,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-sm font-bold",
                                                                                        children: p.nombre
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 797,
                                                                                        columnNumber: 34
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-[10px] text-slate-400",
                                                                                        children: [
                                                                                            p.dia,
                                                                                            " de ",
                                                                                            MONTH_NAMES[p.mes - 1]
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 797,
                                                                                        columnNumber: 81
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 797,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 793,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevronRight, {
                                                                        className: "w-4 h-4 text-slate-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 799,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, p.id, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 791,
                                                                columnNumber: 25
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 746,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 700,
                                    columnNumber: 17
                                }, this),
                                activeTab === 'regalos' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6 animate-fadeIn",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-4 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex-1 max-w-md",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSearch, {
                                                            className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 812,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "Buscar integrante...",
                                                            value: searchQuery,
                                                            onChange: (e)=>setSearchQuery(e.target.value),
                                                            className: "w-full pl-12 pr-4 py-[11px] rounded-2xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 813,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 811,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        'todos',
                                                        'pendientes',
                                                        'completados'
                                                    ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setStatusFilter(f),
                                                            className: `px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === f ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`,
                                                            children: f === 'todos' ? 'Todos' : f === 'pendientes' ? 'Pendientes ⏳' : 'Listos ✅'
                                                        }, f, false, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 819,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 817,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 810,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                                            children: filteredTeam.map((person)=>{
                                                const paidCount = getPaidCount(person.id);
                                                const totalPaid = isFullyPaid(person.id);
                                                const progress = Math.round(paidCount / Math.max(team.length - 1, 1) * 100);
                                                const primaryGift = person.regalo_ideas[0]?.descripcion || 'Sorpresa general';
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>{
                                                        playSoundEffect('tap');
                                                        setSelectedPersonId(person.id);
                                                    },
                                                    className: "p-5 rounded-3xl border bg-slate-900 border-slate-800 hover:bg-slate-850 cursor-pointer flex flex-col justify-between min-h-[220px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `w-10 h-10 rounded-xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white text-sm font-black shrink-0 overflow-hidden`,
                                                                            children: person.foto_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: person.foto_url,
                                                                                className: "w-full h-full object-cover",
                                                                                alt: ""
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 838,
                                                                                columnNumber: 52
                                                                            }, this) : person.nombre.charAt(0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 837,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                    className: "text-sm font-extrabold",
                                                                                    children: [
                                                                                        person.nombre,
                                                                                        " ",
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            children: person.emoji_signo
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 841,
                                                                                            columnNumber: 88
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 841,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-[10px] text-slate-400",
                                                                                    children: [
                                                                                        person.dia,
                                                                                        " de ",
                                                                                        MONTH_NAMES[person.mes - 1]
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 842,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 840,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 836,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-3 rounded-2xl text-[11px] bg-slate-950/80 text-slate-300",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-[8px] font-bold text-slate-400 uppercase mb-1",
                                                                            children: "Deseo Principal:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 846,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "truncate font-medium",
                                                                            children: [
                                                                                "🎁 ",
                                                                                primaryGift
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 847,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 845,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-5 pt-4 border-t border-slate-800/40 space-y-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-full h-1 bg-slate-800 rounded-full overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "h-full bg-rose-500",
                                                                        style: {
                                                                            width: `${progress}%`
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 852,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 851,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex justify-between items-center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `text-[10px] px-2 py-0.5 rounded-full ${totalPaid ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`,
                                                                            children: totalPaid ? 'Listo' : 'En curso'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 855,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-rose-400 font-bold",
                                                                            children: "Gestionar →"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 856,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 854,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 850,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, person.id, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 833,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 826,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 809,
                                    columnNumber: 17
                                }, this),
                                activeTab === 'planilla' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-8 animate-fadeIn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                onSubmit: handleSavePerson,
                                                className: "lg:col-span-5 space-y-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>setFormExpanded((v)=>!v),
                                                            className: "lg:pointer-events-none w-full flex items-center justify-between gap-3 p-6 pb-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3",
                                                                    children: [
                                                                        isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconEdit, {
                                                                            className: "text-rose-500 w-5 h-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 881,
                                                                            columnNumber: 42
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconUserAdd, {
                                                                            className: "text-rose-500 w-5 h-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 881,
                                                                            columnNumber: 90
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                            className: "font-black text-base",
                                                                            children: isEditing ? 'Editar Integrante' : 'Agregar Integrante'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 882,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 880,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconChevronRight, {
                                                                    className: `lg:hidden w-5 h-5 text-slate-400 transition-transform duration-200 ${formExpanded || isEditing ? 'rotate-90' : ''}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 884,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 875,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `${formExpanded || isEditing ? 'block' : 'hidden'} lg:block px-6 pb-6`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "pt-3 border-t border-slate-800/30 mb-5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 889,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                    children: "Nombre"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 894,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "text",
                                                                                    required: true,
                                                                                    placeholder: "Ej. Francisca",
                                                                                    value: formName,
                                                                                    onChange: (e)=>setFormName(e.target.value),
                                                                                    className: "w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 895,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 893,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "grid grid-cols-2 gap-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                            children: "Día"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 903,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "number",
                                                                                            required: true,
                                                                                            min: 1,
                                                                                            max: 31,
                                                                                            value: formDay,
                                                                                            onChange: (e)=>setFormDay(Math.max(1, Math.min(31, parseInt(e.target.value) || 1))),
                                                                                            className: "w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 904,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 902,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                            children: "Mes"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 909,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                            value: formMonth,
                                                                                            onChange: (e)=>setFormMonth(parseInt(e.target.value)),
                                                                                            className: "w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500",
                                                                                            children: MONTH_NAMES.map((n, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                                    value: i + 1,
                                                                                                    children: n
                                                                                                }, i + 1, false, {
                                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                    lineNumber: 912,
                                                                                                    columnNumber: 59
                                                                                                }, this))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 910,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 908,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 901,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "grid grid-cols-2 gap-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                            children: "Signo (auto)"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 920,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "text",
                                                                                            disabled: true,
                                                                                            value: formSign,
                                                                                            className: "w-full px-4 py-2.5 rounded-xl text-xs font-semibold outline-none border bg-slate-950/40 border-slate-800 text-slate-300"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 921,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 919,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                            className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                            children: "Emoji"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 925,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "text",
                                                                                            disabled: true,
                                                                                            value: formEmoji,
                                                                                            className: "w-full px-4 py-2.5 rounded-xl text-center text-sm outline-none border bg-slate-950/40 border-slate-800 text-white"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 926,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 924,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 918,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                    children: "Teléfono (opcional)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 933,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: "tel",
                                                                                    placeholder: "+56 9 1234 5678",
                                                                                    value: formPhone,
                                                                                    onChange: (e)=>setFormPhone(e.target.value),
                                                                                    className: "w-full px-4 py-[11px] rounded-xl text-sm font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 934,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 932,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5",
                                                                                    children: "Foto de Perfil"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 941,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    onDragOver: handleDragOver,
                                                                                    onDragLeave: handleDragLeave,
                                                                                    onDrop: handleDrop,
                                                                                    className: `p-4 rounded-2xl border-2 border-dashed transition-all flex items-center gap-4 ${isDragging ? 'border-rose-500 bg-rose-500/10 scale-[1.02]' : 'border-slate-800 bg-slate-955/20 hover:border-slate-700'}`,
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0",
                                                                                            children: formPhotoPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                src: formPhotoPreview,
                                                                                                className: "w-full h-full object-cover",
                                                                                                alt: "preview"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 948,
                                                                                                columnNumber: 37
                                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCamera, {
                                                                                                className: `w-6 h-6 ${isDragging ? 'text-rose-500 animate-bounce' : 'text-slate-600'}`
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 949,
                                                                                                columnNumber: 37
                                                                                            }, this)
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 946,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex-1 space-y-2",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                                    className: "text-xs font-bold text-slate-300",
                                                                                                    children: isDragging ? '¡Suelta la foto aquí!' : 'Arrastra o selecciona una foto'
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                    lineNumber: 952,
                                                                                                    columnNumber: 33
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "flex items-center gap-2",
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                            type: "file",
                                                                                                            accept: "image/*",
                                                                                                            id: "photo-upload",
                                                                                                            onChange: (e)=>{
                                                                                                                if (e.target.files?.[0]) handlePhotoSelect(e.target.files[0]);
                                                                                                            },
                                                                                                            className: "hidden"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                            lineNumber: 954,
                                                                                                            columnNumber: 35
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                                            htmlFor: "photo-upload",
                                                                                                            className: "px-3.5 py-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-xl text-[11px] font-extrabold border border-rose-500/20 cursor-pointer",
                                                                                                            children: formPhotoPreview ? 'Cambiar' : 'Examinar'
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                            lineNumber: 955,
                                                                                                            columnNumber: 35
                                                                                                        }, this),
                                                                                                        formPhotoPreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                            type: "button",
                                                                                                            onClick: async ()=>{
                                                                                                                setFormPhotoFile(null);
                                                                                                                setFormPhotoPreview(null);
                                                                                                                setFormPhotoRemoved(true);
                                                                                                                if (isEditing && editingPersonId !== null) {
                                                                                                                    try {
                                                                                                                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteFoto"](editingPersonId);
                                                                                                                        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateFotoUrl"](editingPersonId, null);
                                                                                                                        setTeam((prev)=>prev.map((p)=>p.id === editingPersonId ? {
                                                                                                                                    ...p,
                                                                                                                                    foto_url: null
                                                                                                                                } : p));
                                                                                                                        showNotification('Foto eliminada', 'info');
                                                                                                                    } catch  {
                                                                                                                        showNotification('Error al eliminar foto', 'error');
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            className: "text-[10px] text-red-400 font-bold hover:underline",
                                                                                                            children: "Eliminar foto"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                            lineNumber: 959,
                                                                                                            columnNumber: 37
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                    lineNumber: 953,
                                                                                                    columnNumber: 33
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 951,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 942,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 940,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1",
                                                                                    children: "Color de Avatar"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 982,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                    value: formColor,
                                                                                    onChange: (e)=>setFormColor(e.target.value),
                                                                                    className: "w-full px-4 py-[11px] rounded-xl text-xs font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500",
                                                                                    children: PRESET_COLORS.map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: c.value,
                                                                                            children: c.name
                                                                                        }, i, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 985,
                                                                                            columnNumber: 59
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 983,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2 mt-2 pl-1",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-[10px] text-slate-400",
                                                                                            children: "Preview:"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 988,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: `w-6 h-6 rounded-lg bg-gradient-to-tr ${formColor} flex items-center justify-center text-white text-xs font-black overflow-hidden`,
                                                                                            children: formPhotoPreview ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                                src: formPhotoPreview,
                                                                                                className: "w-full h-full object-cover",
                                                                                                alt: ""
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 990,
                                                                                                columnNumber: 53
                                                                                            }, this) : formName.charAt(0) || 'A'
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                                            lineNumber: 989,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 987,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 981,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "space-y-4 pt-2 border-t border-slate-800/40",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                                    className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 block",
                                                                                    children: "Ideas de Regalos"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 997,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                [
                                                                                    [
                                                                                        formGiftText1,
                                                                                        setFormGiftText1,
                                                                                        formGiftLink1,
                                                                                        setFormGiftLink1,
                                                                                        'Regalo 1'
                                                                                    ],
                                                                                    [
                                                                                        formGiftText2,
                                                                                        setFormGiftText2,
                                                                                        formGiftLink2,
                                                                                        setFormGiftLink2,
                                                                                        'Regalo 2'
                                                                                    ],
                                                                                    [
                                                                                        formGiftText3,
                                                                                        setFormGiftText3,
                                                                                        formGiftLink3,
                                                                                        setFormGiftLink3,
                                                                                        'Regalo 3'
                                                                                    ]
                                                                                ].map(([text, setText, link, setLink, label], i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "p-3 rounded-2xl border border-slate-800 bg-slate-950/20 space-y-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-[10px] font-bold text-rose-400 block",
                                                                                                children: label
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1004,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                                                rows: 3,
                                                                                                placeholder: "Descripción del regalo...",
                                                                                                value: text,
                                                                                                onChange: (e)=>setText(e.target.value),
                                                                                                className: "w-full px-3 py-2 rounded-xl text-xs font-medium border bg-slate-950 border-slate-800 text-white focus:border-rose-500 resize-y"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1005,
                                                                                                columnNumber: 33
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                                type: "text",
                                                                                                placeholder: "URL del regalo (opcional)...",
                                                                                                value: link,
                                                                                                onChange: (e)=>setLink(e.target.value),
                                                                                                className: "w-full px-3 py-2 rounded-xl text-xs font-medium border bg-slate-950 border-slate-800 text-white focus:border-rose-500"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1008,
                                                                                                columnNumber: 33
                                                                                            }, this)
                                                                                        ]
                                                                                    }, i, true, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 1003,
                                                                                        columnNumber: 31
                                                                                    }, this))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 996,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 891,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2 mt-6 pt-4 border-t border-slate-800/30",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "submit",
                                                                            disabled: isSaving,
                                                                            className: "flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95",
                                                                            children: isSaving ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Agregar Integrante'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 1017,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        (isEditing || formName) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            onClick: resetForm,
                                                                            className: "px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:bg-slate-700",
                                                                            children: "Cancelar"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                                            lineNumber: 1022,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                    lineNumber: 1016,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/BirthdayApp.tsx",
                                                            lineNumber: 888,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                    lineNumber: 873,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 872,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "lg:col-span-7 space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "font-black text-sm",
                                                                        children: "Integrantes en la Planilla"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 1036,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-[10px] text-slate-400",
                                                                        children: [
                                                                            "Total: ",
                                                                            team.length,
                                                                            " personas"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 1037,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 1035,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative max-w-xs flex-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconSearch, {
                                                                        className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 1040,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "text",
                                                                        placeholder: "Buscar...",
                                                                        value: searchAdminQuery,
                                                                        onChange: (e)=>setSearchAdminQuery(e.target.value),
                                                                        className: "w-full pl-10 pr-3 py-1.5 rounded-xl text-xs font-semibold outline-none border bg-slate-950 border-slate-800 text-white focus:border-rose-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 1041,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 1039,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                        lineNumber: 1034,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3 max-h-[700px] overflow-y-auto pr-1",
                                                        children: filteredAdminTeam.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `p-4 rounded-3xl border flex items-center justify-between transition-all ${editingPersonId === person.id ? 'border-rose-500 bg-rose-500/5' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-4 min-w-0",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: `w-11 h-11 rounded-2xl bg-gradient-to-tr ${person.color} flex items-center justify-center text-white font-black text-sm shadow-md shrink-0 overflow-hidden`,
                                                                                children: person.foto_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                    src: person.foto_url,
                                                                                    className: "w-full h-full object-cover",
                                                                                    alt: ""
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 1055,
                                                                                    columnNumber: 52
                                                                                }, this) : person.nombre.charAt(0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 1054,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "min-w-0 space-y-0.5",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                                                                        className: "font-extrabold text-sm truncate",
                                                                                        children: [
                                                                                            person.nombre,
                                                                                            " ",
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                children: person.emoji_signo
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1058,
                                                                                                columnNumber: 97
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 1058,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-slate-400 font-bold",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                children: [
                                                                                                    person.dia,
                                                                                                    " de ",
                                                                                                    MONTH_NAMES[person.mes - 1]
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1060,
                                                                                                columnNumber: 35
                                                                                            }, this),
                                                                                            person.telefono && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-slate-500",
                                                                                                children: [
                                                                                                    "| 📱 ",
                                                                                                    person.telefono
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1061,
                                                                                                columnNumber: 55
                                                                                            }, this),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-slate-500",
                                                                                                children: [
                                                                                                    "| ",
                                                                                                    person.regalo_ideas.length,
                                                                                                    " deseos"
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                                lineNumber: 1062,
                                                                                                columnNumber: 35
                                                                                            }, this)
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                                        lineNumber: 1059,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 1057,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 1053,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1.5 shrink-0 pl-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleStartEdit(person),
                                                                                className: "p-2 rounded-xl border bg-slate-800/50 border-slate-700 text-rose-400 hover:text-rose-300 transition-all hover:scale-105",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconEdit, {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 1069,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 1067,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>{
                                                                                    playSoundEffect('tap');
                                                                                    setPersonToDelete(person);
                                                                                },
                                                                                className: "p-2 rounded-xl border bg-slate-850/50 border-slate-800 text-rose-500/70 hover:text-rose-500 hover:bg-rose-500/10 transition-all hover:scale-105",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconTrash, {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/components/BirthdayApp.tsx",
                                                                                    lineNumber: 1073,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                                lineNumber: 1071,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                                        lineNumber: 1066,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, person.id, true, {
                                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                                lineNumber: 1049,
                                                                columnNumber: 27
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/BirthdayApp.tsx",
                                                        lineNumber: 1047,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/BirthdayApp.tsx",
                                                lineNumber: 1033,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/BirthdayApp.tsx",
                                        lineNumber: 869,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 868,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/BirthdayApp.tsx",
                        lineNumber: 580,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 557,
                columnNumber: 7
            }, this),
            adminNotification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed bottom-6 right-6 px-5 py-3.5 rounded-2xl text-sm font-bold shadow-2xl z-50 transition-all animate-fadeIn ${adminNotification.type === 'success' ? 'bg-emerald-500 text-white' : adminNotification.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-200'}`,
                children: adminNotification.msg
            }, void 0, false, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 1090,
                columnNumber: 9
            }, this),
            personToDelete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `p-6 rounded-[32px] max-w-md w-full border shadow-2xl space-y-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-4xl",
                                    children: "⚠️"
                                }, void 0, false, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 1104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-black",
                                    children: "¿Confirmas la eliminación?"
                                }, void 0, false, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 1105,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400 leading-relaxed",
                                    children: [
                                        "Estás a punto de eliminar a ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-extrabold text-rose-500",
                                            children: personToDelete.nombre
                                        }, void 0, false, {
                                            fileName: "[project]/components/BirthdayApp.tsx",
                                            lineNumber: 1107,
                                            columnNumber: 45
                                        }, this),
                                        ". Esta acción borrará permanentemente sus datos, aportes y deseos de regalo."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 1106,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BirthdayApp.tsx",
                            lineNumber: 1103,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: confirmDeletePerson,
                                    className: "flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95",
                                    children: "Sí, eliminar"
                                }, void 0, false, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 1111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        playSoundEffect('tap');
                                        setPersonToDelete(null);
                                    },
                                    className: "flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-400 hover:bg-slate-700 transition-all",
                                    children: "Cancelar"
                                }, void 0, false, {
                                    fileName: "[project]/components/BirthdayApp.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/BirthdayApp.tsx",
                            lineNumber: 1110,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/BirthdayApp.tsx",
                    lineNumber: 1102,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/BirthdayApp.tsx",
                lineNumber: 1101,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BirthdayApp.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, this);
}
_s(BirthdayApp, "rzf14xg6KKfPyzrsuD6nAFEau9Y=");
_c14 = BirthdayApp;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "IconCake");
__turbopack_context__.k.register(_c1, "IconGift");
__turbopack_context__.k.register(_c2, "IconCheck");
__turbopack_context__.k.register(_c3, "IconChevronLeft");
__turbopack_context__.k.register(_c4, "IconChevronRight");
__turbopack_context__.k.register(_c5, "IconSparkles");
__turbopack_context__.k.register(_c6, "IconParty");
__turbopack_context__.k.register(_c7, "IconLink");
__turbopack_context__.k.register(_c8, "IconSearch");
__turbopack_context__.k.register(_c9, "IconDatabase");
__turbopack_context__.k.register(_c10, "IconEdit");
__turbopack_context__.k.register(_c11, "IconUserAdd");
__turbopack_context__.k.register(_c12, "IconTrash");
__turbopack_context__.k.register(_c13, "IconCamera");
__turbopack_context__.k.register(_c14, "BirthdayApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BirthdayApp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/BirthdayApp.tsx [app-client] (ecmascript)");
'use client';
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$BirthdayApp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0i9m0bv._.js.map