export const pageview = ({ url, id }: { url: any, id: string }) => {
    window.gtag('config', id, {
        path_url: url,
    })
}