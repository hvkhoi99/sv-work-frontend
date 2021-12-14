import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export function PrivateRouteAdminAuth({ component: Component, ...rest }) {
	const admin = useSelector((state) => state.admin);
	const adminRole = admin.current.role_id === 1;

	return (
		<div>
			<Route
				{...rest}
				render={(props) => {
					return adminRole ? (
						<Redirect to='/admin' />
					) : (
						<Component {...props} />
					);
				}}
			/>
		</div>
	);
}

export function PrivateRouteAdmin({ component: Component, ...rest }) {
	const admin = useSelector((state) => state.admin);
	const adminRole = admin.current.role_id === 1;

	return (
		<div>
			<Route
				{...rest}
				render={(props) => {
					return adminRole ? (
						<Component {...props} />
					) : (
						<Redirect to='/admin/auth/admin-sign-in' />
					);
				}}
			/>
		</div>
	);
}

export function PrivateRouteUserAuth({ component: Component, ...rest }) {
	const user = useSelector((state) => state.user);
	const userRole = user.current;

	return (
		<div>
			<Route
				{...rest}
				render={(props) => {
					return userRole.role_id === 3 ? (
						<Redirect to='/' />
					) : user.role_id === 2 ? (
						<Redirect to='/recruiter' />
					) : (
						<Component {...props} />
					)
				}}
			/>
		</div>
	);
}