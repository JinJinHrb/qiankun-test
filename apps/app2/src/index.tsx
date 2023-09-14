import './public-path'
const boot = import('./bootstrap')

export async function bootstrap() {
	return (await boot).bootstrap()
}

export async function mount(props?: { container: HTMLElement }) {
	return (await boot).mount(props)
}

export async function unmount() {
	return (await boot).unmount()
}
